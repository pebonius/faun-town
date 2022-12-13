import Creature from "./creature.js";
import Point from "../../geometry/point.js";
import { checkForTypeError } from "../../utilities/utilities.js";

export default class Passage extends Creature {
  constructor(gameScreen, position, map, char, targetPosition, targetMap) {
    super(gameScreen, position, map);
    this.name = "passage";
    this.char = char;
    this.setTargetPosition(targetPosition);
    this.setTargetMap(targetMap);
  }
  getTargetPosition() {
    return this.targetPosition;
  }
  setTargetPosition(value) {
    checkForTypeError(value, "value", Point);
    this.targetPosition = value;
  }
  getTargetMap() {
    return this.targetMap;
  }
  setTargetMap(value) {
    if (value == null || value == undefined) {
      throw new ReferenceError("targetMap must not be null or undefined");
    }
    this.targetMap = value;
  }
  onCollision(collider) {
    const targetPosition = this.getTargetPosition();
    const targetMap = this.getTargetMap();
    collider.move(targetPosition, targetMap);
  }
}
