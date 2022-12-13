import MapObject from "../mapObject.js";
import Point from "../../geometry/point.js";
import { checkForTypeError, isNonEmptyString } from "../../utilities/utilities.js";

export default class Creature extends MapObject {
  constructor(gameScreen, position, map) {
    super(gameScreen);
    checkForTypeError(position, "position", Point);
    const layer = map.creatures;
    this.placeOnMap(new Point(position.x, position.y), map, layer);
    this.name = "undefined creature";
    this.isDead = false;
  }
  get collisionMessage() {
    return this._collisionMessage;
  }
  set collisionMessage(value) {
    if (!isNonEmptyString(value)) {
      throw new TypeError("collisionMessage must be a non-empty string");
    }
    this._collisionMessage = value;
  }
  get defaultCollisionMessage() {
    return "It's a " + this.name.toUpperCase() + ".";
  }
  getTargetLayer(map) {
    if (map.creatures != null) {
      return map.creatures;
    }
  }
  onCollision(collider) {
    if (isNonEmptyString(this.collisionMessage)) {
      this.logMessage(this.collisionMessage);
    }
    this.logMessage(this.defaultCollisionMessage);
  }
  logDropMessage(droppedObject) {
    if (!isNonEmptyString(this.name) || !isNonEmptyString(droppedObject.name)) {
      return;
    }
    this.logMessage(
      this.name.toUpperCase() +
        " dropped a " +
        droppedObject.name.toUpperCase() +
        "."
    );
  }
}
