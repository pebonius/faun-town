import {
  randomNumber,
  passPercentileRoll,
  isNonEmptyString,
  isFunction,
  checkForTypeError,
} from "../utilities/utilities.js";
import Point from "../geometry/point.js";
import Tile from "../tilemap/tile.js";

export default class MapObject {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.name = "undefined";
    this.char = "?";
    this.obscuredChar = "🔹";
    this.layer = null;
    this.isDead = false;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (!isNonEmptyString(value)) {
      throw new Error("Provided name must be a non-empty string.");
    }
    this._name = value;
  }
  get layer() {
    return this._layer;
  }
  set layer(value) {
    this._layer = value;
  }
  get map() {
    return this._map;
  }
  set map(value) {
    if (value == null || value == undefined) {
      throw new ReferenceError("map is null or undefined");
    }
    if (checkForTypeError(value.startingPosition, "value", Point)) {
      throw new TypeError("provided value is not a Tilemap");
    }
    this._map = value;
  }
  getPosition() {
    return this.position;
  }
  setPosition(value) {
    checkForTypeError(value, "value", Point);
    this.position = value;
  }
  get char() {
    return this._char;
  }
  set char(value) {
    if (isNonEmptyString(value)) {
      this._char = value;
    }
  }
  get obscuredChar() {
    return this._obscuredChar;
  }
  set obscuredChar(value) {
    if (isNonEmptyString(value)) {
      this._obscuredChar = value;
    }
  }
  kill() {
    this.isDead = true;
  }
  getTargetLayer(map) {
    return null;
  }
  placeOnMap(targetPosition, targetMap, targetLayer) {
    const isEnteringNewMap = this.isEnteringNewMap(this.map, targetMap);
    this.layer = targetLayer;
    if (this.position != undefined) {
      targetLayer.remove(this);
    }
    targetLayer.set(targetPosition, this);
    this.setPosition(new Point(targetPosition.x, targetPosition.y));
    this.map = targetMap;

    if (isEnteringNewMap) {
      this.onEnterMap(targetMap);
      return false;
    }
    return true;
  }
  onEnterMap(map) {}
  isEnteringNewMap(currentMap, targetMap) {
    return currentMap != targetMap;
  }
  removeFromMap() {
    if (this.map != null) {
      this.layer.remove(this);
    }
  }
  move(targetPosition, targetMap) {
    if (!this.canMoveTo(targetPosition, targetMap)) {
      return false;
    }

    const targetLayer = this.getTargetLayer(targetMap);
    const collider = targetLayer.get(targetPosition);

    if (this.isCollision(collider)) {
      this.resolveCollision(collider);
      return true;
    }

    const cachedPosition = this.position;
    this.removeFromMap();
    this.onMoved(cachedPosition);
    return this.placeOnMap(targetPosition, targetMap, targetLayer);
  }
  onMoved(previousPosition) {}
  moveAtRandom() {
    if (this.getPosition() instanceof Point) {
      const pos = this.getPosition();
      const targetPos = new Point(
        randomNumber(pos.x - 1, pos.x + 1),
        randomNumber(pos.y - 1, pos.y + 1)
      );
      this.move(targetPos, this.map);
    }
  }
  doAtChance(percentChance, action) {
    if (passPercentileRoll(percentChance)) {
      action();
    }
  }
  logMessage(message) {
    this.gameScreen.messageLog.queue(message);
  }
  say(line) {
    this.logMessage(this.name + " says <<" + line + ">>");
  }
  isCollision(collider) {
    return collider != null && typeof collider.onCollision === "function";
  }
  resolveCollision(collider) {}
  onCollision(collider) {}
  canMoveTo(targetPosition, targetMap) {
    const tile = targetMap.tiles.get(targetPosition);
    return tile instanceof Tile && tile.isWalkable;
  }
  onTurn() {}
  update(input) {}
  draw(context) {}
}
