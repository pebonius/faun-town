import Point from "../../geometry/point.js";
import {
  checkForTypeErrorNum,
  isBool,
  isNonEmptyString,
  isNumber,
} from "../../utilities/utilities.js";

export default class DungeonDefinition {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.name = "some random dungeon";
    this.musicAsset = "none";
    this.minChambers = 5;
    this.maxChambers = 10;
    this.minChamberSize = new Point(3, 3);
    this.maxChamberSize = new Point(4, 4);
    this.erosion = false;
    this.exitChar = "🪜";
    this.levels = 1;
    // TODO: add exit position within starting chamber
    // TODO: add excluded chamber directions
  }
  get width() {
    return this._width;
  }
  set width(value) {
    const minWidth = 4;
    if (value < minWidth) {
      throw new RangeError("dungeons must have minimum width of " + minWidth);
    }
    this._width = value;
  }
  get height() {
    return this._height;
  }
  set height(value) {
    const minHeight = 4;
    if (value < minHeight) {
      throw new RangeError("dungeons must have minimum height of " + minHeight);
    }
    this._height = value;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (!isNonEmptyString(value)) {
      throw new TypeError("dungeon name must be a non-empty string");
    }
    this._name = value;
  }
  get musicAsset() {
    return this._musicAsset;
  }
  set musicAsset(value) {
    if (!isNonEmptyString(value)) {
      throw new TypeError("dungeon music must be a non-empty string");
    }
    this._musicAsset = value;
  }
  get minChambers() {
    return this._minChambers;
  }
  set minChambers(value) {
    if (!isNumber(value)) {
      throw new TypeError("minChambers must be a number");
    }
    const minAllowedChambers = 1;
    if (value < minAllowedChambers) {
      throw new RangeError(
        "minChambers must be at least " + minAllowedChambers
      );
    }
    this._minChambers = value;
  }
  get maxChambers() {
    return this._maxChambers;
  }
  set maxChambers(value) {
    if (!isNumber(value)) {
      throw new TypeError("maxChambers must be a number");
    }
    this._maxChambers = value;
  }
  get minChamberSize() {
    return this._minChamberSize;
  }
  set minChamberSize(value) {
    const minAllowedX = 3;
    const minAllowedY = 3;
    if (value.x < minAllowedX) {
      throw new RangeError("minChamberSize x must be at least " + minAllowedX);
    }
    if (value.y < minAllowedY) {
      throw new RangeError("minChamberSize y must be at least " + minAllowedY);
    }
    this._minChamberSize = value;
  }
  get maxChamberSize() {
    return this._maxChamberSize;
  }
  set maxChamberSize(value) {
    if (value.x < this.minChamberSize.x) {
      throw new RangeError(
        "maxChamberSize x must be equal or bigger than minChamberSize y"
      );
    }
    if (value.y < this.minChamberSize.y) {
      throw new RangeError(
        "maxChamberSize x must be equal or bigger than minChamberSize y"
      );
    }
    this._maxChamberSize = value;
  }
  get erosion() {
    return this._erosion;
  }
  set erosion(value) {
    if (!isBool(value)) {
      throw new TypeError("erosion must be a bool");
    }
    this._erosion = value;
  }
  get exitChar() {
    return this._exitChar;
  }
  set exitChar(value) {
    if (!isNonEmptyString(value)) {
      throw new TypeError("exitChar must be a non-empty string");
    }
    this._exitChar = value;
  }
  get levels() {
    return this._levels;
  }
  set levels(value) {
    checkForTypeErrorNum(value, "levels");

    this._levels = value;
  }
  load(asset) {
    this.width = asset.width;
    this.height = asset.height;
    this.name = asset.name;
    this.musicAsset = asset.musicAsset;
    this.minChambers = asset.minChambers;
    this.maxChambers = asset.maxChambers;
    this.minChamberSize = new Point(
      asset.minChamberSizeX,
      asset.minChamberSizeY
    );
    this.maxChamberSize = new Point(
      asset.maxChamberSizeX,
      asset.maxChamberSizeY
    );
    this.erosion = asset.erosion;
    this.exitChar = asset.exitChar;
    this.levels = asset.levels;
  }
}
