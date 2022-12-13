import Point from "../geometry/point.js";
import { checkForArray, checkForTypeError } from "../utilities/utilities.js";

export default class TilemapLayer {
  constructor(tilemap) {
    this.tilemap = tilemap;
    this.create();
  }
  get tilemap() {
    return this._tilemap;
  }
  set tilemap(value) {
    this._tilemap = value;
  }
  get grid() {
    return this._grid;
  }
  set grid(value) {
    checkForArray(value);

    this._grid = value;
  }
  create() {
    const grid = new Array(this.tilemap.bounds.width);

    for (var i = 0; i < grid.length; i++) {
      grid[i] = new Array(this.tilemap.bounds.height);
    }

    this.grid = grid;
  }
  get(pos) {
    if (this.tilemap.containsPosition(pos)) {
      return this.grid[pos.x][pos.y];
    }
    return null;
  }
  set(pos, value) {
    if (this.tilemap.containsPosition(pos)) {
      this.grid[pos.x][pos.y] = value;
    }
  }
  remove(value) {
    checkForTypeError(value.position, "value.position", Point);
    this.set(value.position, null);
  }
}
