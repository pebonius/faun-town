import Point from "../geometry/point.js";

export default class Entity {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.name = "entity";
  }
  toString() {
    return this.name;
  }
  placeOnMap(targetPosition, targetMap) {
    const isEnteringNewMap = this.isEnteringNewMap(this.map, targetMap);
    if (this.position != undefined) {
      this.map.removeEntity(this);
    }
    targetMap.setEntity(targetPosition, this);
    this.position = new Point(targetPosition.x, targetPosition.y);
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
      this.map.removeEntity(this);
    }
  }
  move(targetPosition, targetMap) {
    if (!this.canMoveTo(targetPosition, targetMap)) {
      return false;
    }

    const collider = this.map.getEntity(targetPosition);

    if (this.isCollision(collider)) {
      this.resolveCollision(collider);
      return true;
    }

    const cachedPosition = this.position;
    this.removeFromMap();
    this.onMoved(cachedPosition);
    return this.placeOnMap(targetPosition, targetMap);
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
  isCollision(collider) {
    return collider != null && typeof collider.onCollision === "function";
  }
  resolveCollision(collider) {}
  onCollision(collider) {}
  canMoveTo(targetPosition, targetMap) {
    return this.map.isWalkable(targetPosition);
  }
  onTurn() {}
}
