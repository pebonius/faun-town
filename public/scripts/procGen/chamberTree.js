import { randomNumber } from "../utilities/utilities.js";
import Rectangle from "../geometry/rectangle.js";
import Point from "../geometry/point.js";
import Tile from "../tilemap/tile.js";

export default class ChamberTree {
  constructor(
    bounds,
    minChambers,
    maxChambers,
    minChamberSize,
    maxChamberSize,
    excludedDirections
  ) {
    this.bounds = bounds;
    this.minChambers = minChambers;
    this.maxChambers = maxChambers;
    this.minChamberSize = minChamberSize;
    this.maxChamberSize = maxChamberSize;
    this.chambers = new Array();
    this.passages = new Array();
    this.excludedDirections = excludedDirections;

    this.create();
  }
  get randomChamberSize() {
    const width = randomNumber(this.minChamberSize.x, this.maxChamberSize.x);
    const height = randomNumber(this.minChamberSize.y, this.maxChamberSize.y);
    return new Point(width, height);
  }
  newStartingChamber() {
    const startingChamberSize = this.randomChamberSize;
    const startingChamberPos = new Point(
      this.bounds.center.x - startingChamberSize.x / 2,
      this.bounds.center.y - startingChamberSize.y / 2
    );

    this.startingChamber = new Rectangle(
      startingChamberPos,
      startingChamberSize
    );
    return this.startingChamber;
  }
  fillTreeWithTileType(tileType, tilemap) {
    for (let i = 0; i < this.chambers.length; i++) {
      tilemap.fillWithType(this.chambers[i], tileType);
    }
    for (let i = 0; i < this.passages.length; i++) {
      tilemap.tiles.set(this.passages[i], new Tile(tileType));
    }
  }
  create() {
    const chamberAmount = randomNumber(this.minChambers, this.maxChambers);

    this.chambers.push(this.newStartingChamber());

    let attempts = 0;
    const maxAttempts = 1000;

    while (this.chambers.length < chamberAmount && attempts < maxAttempts) {
      this.addRandomChildChamber(this.getRandomChamber(false));
      attempts++;
    }
  }
  addRandomChildChamber(parentChamber) {
    const allowedAddFunctions = this.getAllowedAddFunctions();

    if (allowedAddFunctions.length == 0) {
      return;
    }

    allowedAddFunctions[randomNumber(0, allowedAddFunctions.length - 1)](
      parentChamber
    );
  }
  getAllowedAddFunctions() {
    const allowedDirections = new Array();

    if (
      !Array.isArray(this.excludedDirections) ||
      !this.excludedDirections.includes("up")
    ) {
      allowedDirections.push((parentChamber) => {
        this.addChamberUp(parentChamber);
      });
    }
    if (
      !Array.isArray(this.excludedDirections) ||
      !this.excludedDirections.includes("down")
    ) {
      allowedDirections.push((parentChamber) => {
        this.addChamberDown(parentChamber);
      });
    }
    if (
      !Array.isArray(this.excludedDirections) ||
      !this.excludedDirections.includes("left")
    ) {
      allowedDirections.push((parentChamber) => {
        this.addChamberLeft(parentChamber);
      });
    }
    if (
      !Array.isArray(this.excludedDirections) ||
      !this.excludedDirections.includes("right")
    ) {
      allowedDirections.push((parentChamber) => {
        this.addChamberRight(parentChamber);
      });
    }

    return allowedDirections;
  }
  addChamberUp(parentChamber) {
    const chamberSize = this.randomChamberSize;
    const passage = this.passageUp(parentChamber);
    const chamberPos = this.chamberOriginUp(passage, chamberSize);
    const childChamber = new Rectangle(chamberPos, chamberSize);
    if (this.canAddChamber(childChamber)) {
      this.addChildChamber(childChamber, passage);
    }
  }
  addChamberDown(parentChamber) {
    const chamberSize = this.randomChamberSize;
    const passage = this.passageDown(parentChamber);
    const chamberPos = this.chamberOriginDown(passage, chamberSize);
    const childChamber = new Rectangle(chamberPos, chamberSize);
    if (this.canAddChamber(childChamber)) {
      this.addChildChamber(childChamber, passage);
    }
  }
  addChamberLeft(parentChamber) {
    const chamberSize = this.randomChamberSize;
    const passage = this.passageLeft(parentChamber);
    const chamberPos = this.chamberOriginLeft(passage, chamberSize);
    const childChamber = new Rectangle(chamberPos, chamberSize);
    if (this.canAddChamber(childChamber)) {
      this.addChildChamber(childChamber, passage);
    }
  }
  addChamberRight(parentChamber) {
    const chamberSize = this.randomChamberSize;
    const passage = this.passageRight(parentChamber);
    const chamberPos = this.chamberOriginRight(passage, chamberSize);
    const childChamber = new Rectangle(chamberPos, chamberSize);
    if (this.canAddChamber(childChamber)) {
      this.addChildChamber(childChamber, passage);
    }
  }
  addChildChamber(childChamber, passage) {
    this.chambers.push(childChamber);
    this.passages.push(passage);
  }
  canAddChamber(childChamber) {
    return (
      this.isChamberWithinBounds(childChamber) &&
      !this.isInCollisionWithChambers(childChamber)
    );
  }
  isChamberWithinBounds(chamber) {
    return (
      chamber.left > this.bounds.left &&
      chamber.top > this.bounds.top &&
      chamber.right < this.bounds.right &&
      chamber.bottom < this.bounds.bottom
    );
  }
  passageUp(parentChamber) {
    return new Point(
      randomNumber(parentChamber.left, parentChamber.right - 1),
      parentChamber.top - 1
    );
  }
  chamberOriginUp(passage, size) {
    return new Point(
      randomNumber(passage.x - size.x + 1, passage.x),
      passage.y - size.y
    );
  }
  passageDown(parentChamber) {
    return new Point(
      randomNumber(parentChamber.left, parentChamber.right - 1),
      parentChamber.bottom
    );
  }
  chamberOriginDown(passage, size) {
    return new Point(
      randomNumber(passage.x - size.x + 1, passage.x),
      passage.y + 1
    );
  }
  passageLeft(parentChamber) {
    return new Point(
      parentChamber.left - 1,
      randomNumber(parentChamber.top, parentChamber.bottom - 1)
    );
  }
  chamberOriginLeft(passage, size) {
    return new Point(
      passage.x - size.x,
      randomNumber(passage.y - size.y + 1, passage.y)
    );
  }
  passageRight(parentChamber) {
    return new Point(
      parentChamber.right,
      randomNumber(parentChamber.top, parentChamber.bottom - 1)
    );
  }
  chamberOriginRight(passage, size) {
    return new Point(
      passage.x + 1,
      randomNumber(passage.y - size.y + 1, passage.y)
    );
  }
  isInCollisionWithChambers(chamber) {
    return this.chambers.some((i) => Rectangle.intersects(i, chamber));
  }
  getChamber(index) {
    if (this.chambers.length <= 0) {
      throw new Error("The chambers array is empty.");
    }
    if (index >= this.chambers.length) {
      throw new RangeError("Provided index is outside of chambers array.");
    }
    return this.chambers[index];
  }
  getRandomChamber(excludeStarting) {
    const offset = excludeStarting ? 1 : 0;
    return this.getChamber(randomNumber(0 + offset, this.chambers.length - 1));
  }
  getLastChamberIndex() {
    return this.chambers.length - 1;
  }
}
