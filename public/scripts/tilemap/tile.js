import { hasValue } from "../utilities/utilities.js";

export default class Tile {
  constructor(type) {
    this.type = type;
  }
  get types() {
    return {
      WALL: "wall",
      FLOOR: "floor",
      DIGGABLE: "diggable",
    };
  }
  get type() {
    return this._type;
  }
  set type(value) {
    if (!hasValue(this.types, value)) {
      throw new RangeError(value + " is not a permitted tile type");
    }
    this._type = value;
  }
  get isWalkable() {
    return this.type == this.types.FLOOR;
  }
  get color() {
    switch (this.type) {
      case this.types.FLOOR:
        return "#111116";
      case this.types.WALL:
        return "#524b49";
      case this.types.DIGGABLE:
        return "#AF8F55";
      default:
        return "#f06";
    }
  }
}
