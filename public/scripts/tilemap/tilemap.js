import {
  checkForTypeErrorNum,
  randomNumber,
  checkForTypeError,
  isNonEmptyString,
  isRunningInChrome,
  isRunningInFirefox,
} from "../utilities/utilities.js";
import Rectangle from "../geometry/rectangle.js";
import Point from "../geometry/point.js";
import Tile from "./tile.js";
import { drawRectangle, drawText } from "../utilities/graphics.js";
import TilemapLayer from "./tilemapLayer.js";
import TilemapObjectsUpdater from "./tilemapObjectsUpdater.js";

export default class Tilemap {
  constructor(width, height, gameScreen) {
    this.width = width;
    this.height = height;
    this.bounds = new Rectangle(new Point(0, 0), new Point(width, height));
    this.gameScreen = gameScreen;
    this.music = null;
    this.name = "some freaking place";
    this.floorType = "floor";
    this.diggableType = "diggable";
    this.wallType = "wall";
    this.lightLevel = 7;
    this.tiles = new TilemapLayer(this);
    this.creatures = new TilemapLayer(this);
    this.items = new TilemapLayer(this);
    this.visibility = new TilemapLayer(this);
    this.objectsUpdater = new TilemapObjectsUpdater(this);
    this.charOffset = this.totalCharOffset;
    this.fieldOfView.setInitialVisibility(this);
  }
  get width() {
    return this._width;
  }
  set width(value) {
    if (this.width !== undefined) {
      throw new Error("tilemap width can only be set once");
    }
    checkForTypeErrorNum(value, "width");
    if (value < 4) {
      throw new RangeError("tilemap width cannot be < 4");
    }
    this._width = value;
  }
  get height() {
    return this._height;
  }
  set height(value) {
    if (this.height !== undefined) {
      throw new Error("tilemap height can only be set once");
    }
    checkForTypeErrorNum(value, "height");
    if (value < 4) {
      throw new RangeError("tilemap height cannot be < 4");
    }
    this._height = value;
  }
  get bounds() {
    return this._bounds;
  }
  set bounds(value) {
    if (this.bounds !== undefined) {
      throw new Error("tilemap bounds can only be set once");
    }
    checkForTypeError(value, "bounds", Rectangle);
    this._bounds = value;
  }
  get lightLevel() {
    return this._lightLevel;
  }
  set lightLevel(value) {
    checkForTypeErrorNum(value, "lightLevel");

    if (value < 0 || value > 10) {
      throw new RangeError("lightLevel must be between 0 and 10");
    }

    this._lightLevel = value;
  }
  get tileSize() {
    return this.gameScreen.tileSize;
  }
  get gridWidth() {
    return this.gameScreen.gridWidth;
  }
  get flora() {
    return this.gameScreen.flora;
  }
  get interiors() {
    return this.gameScreen.interiors;
  }
  get fieldOfView() {
    return this.gameScreen.fieldOfView;
  }
  get music() {
    return this._music;
  }
  set music(value) {
    if (value instanceof Audio || value === null) {
      this._music = value;
    } else {
      throw new TypeError("music can only be Audio or null");
    }
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (isNonEmptyString(value)) {
      this._name = value;
    }
  }
  get startingPosition() {
    return this._startingPosition;
  }
  set startingPosition(value) {
    checkForTypeError(value, "value", Point);
    this._startingPosition = value;
  }
  get charOffset() {
    return this._charOffset;
  }
  set charOffset(value) {
    checkForTypeError(value, "charOffset", Point);

    this._charOffset = value;
  }
  get totalCharOffset() {
    let xOffset = 0;
    let yOffset = 0;

    const browserOffset = this.browserCharOffset;

    xOffset += browserOffset.x;
    yOffset += browserOffset.y;

    return new Point(xOffset, yOffset);
  }
  get browserCharOffset() {
    if (isRunningInChrome()) {
      return new Point(-1, 2);
    }
    if (isRunningInFirefox()) {
      return new Point(1, 2);
    }
    return new Point(0, 0);
  }
  get browserCharSizeDifference() {
    if (isRunningInFirefox()) {
      return 1;
    }
    return 0;
  }
  generate() {
    this.fillWithType(this.bounds, this.floorType);
    this.startingPosition = this.bounds.center;
  }
  populate() {}
  playMusic() {
    this.gameScreen.sound.playMusic(this.music, true);
  }
  containsPosition(pos) {
    return (
      pos.x >= 0 &&
      pos.x < this.bounds.width &&
      pos.y >= 0 &&
      pos.y < this.bounds.height
    );
  }
  tileWalkable(pos) {
    const tile = this.tiles.get(pos);

    return tile instanceof Tile && tile.isWalkable;
  }
  canPlaceCreature(pos) {
    return this.tileWalkable(pos) && this.creatures.get(pos) == null;
  }
  canPlaceItem(pos) {
    return this.tileWalkable(pos) && this.items.get(pos) == null;
  }
  isTileFree(pos) {
    return this.canPlaceCreature(pos) && this.canPlaceItem(pos);
  }
  freeNeighborPosition(pos, range = 1) {
    for (let x = pos.x - range; x <= pos.x + range; x++) {
      for (let y = pos.y - range; y <= pos.y + range; y++) {
        const pos = new Point(x, y);
        if (this.isTileFree(pos)) {
          return pos;
        }
      }
    }
    return null;
  }
  performOnTiles(rectangle, action) {
    for (let y = rectangle.top; y < rectangle.bottom; y++) {
      for (let x = rectangle.left; x < rectangle.right; x++) {
        const pos = new Point(x, y);
        action(pos);
      }
    }
  }
  performOnTilesInViewport(action) {
    const camera = this.gameScreen.camera;
    const cameraPos = camera.position;

    for (let y = cameraPos.y; y < cameraPos.y + camera.viewportSize.y; y++)
      for (let x = cameraPos.x; x < cameraPos.x + camera.viewportSize.x; x++) {
        var pos = new Point(x, y);
        action(pos);
      }
  }
  performOnBorders(action) {
    this.performOnTiles(this.bounds, (pos) => {
      if (
        pos.x == 0 ||
        pos.x == this.bounds.width - 1 ||
        pos.y == 0 ||
        pos.y == this.bounds.height - 1
      ) {
        action(pos);
      }
    });
  }
  setBorderType(type) {
    this.performOnBorders((pos) => {
      this.tiles.set(pos, new Tile(type));
    });
  }
  fillWithType(rectangle, type) {
    this.performOnTiles(rectangle, (pos) => {
      this.tiles.set(pos, new Tile(type));
    });
  }
  fillAtRandom(rectangle, types) {
    this.performOnTiles(rectangle, (pos) => {
      let type = types[randomNumber(0, types.length - 1)];
      this.tiles.set(pos, new Tile(type));
    });
  }
  erodeTiles(iterations, typeA, typeB) {
    for (let i = 0; i < iterations; i++) {
      this.performOnTiles(this.bounds, (pos) => {
        const typeNeighbours = this.numberOfTypeNeighbors(pos, 1, typeA);
        this.tiles.set(pos, new Tile(typeNeighbours > 4 ? typeA : typeB));
      });
    }
  }
  numberOfTypeNeighbors(pos, range, type) {
    const neighbors = this.neighboringTiles(pos, range);

    let matchingTypeNeighbors = neighbors.filter((tile) => {
      return tile.type == type;
    }).length;

    return matchingTypeNeighbors;
  }
  neighboringTiles(pos, range) {
    if (this.tiles.get(pos) == null || this.tiles.get(pos) == undefined) {
      throw new ReferenceError("Provided tile was must be defined.");
    }

    const neighbors = new Array();

    for (let x = pos.x - range; x <= pos.x + range; x++) {
      for (let y = pos.y - range; y <= pos.y + range; y++) {
        const pos = new Point(x, y);
        const tile = this.tiles.get(pos);
        if (tile != null) {
          neighbors.push(tile);
        }
      }
    }

    return neighbors;
  }
  isAccessible(pos) {
    return this.numberOfTypeNeighbors(pos, 1, "floor") > 0;
  }
  isVisible(pos) {
    return this.visibility.get(pos);
  }
  isSurroundedByFloor(pos) {
    return this.numberOfTypeNeighbors(pos, 1, "floor") == 9;
  }
  onTurn(player) {
    this.objectsUpdater.update();
    this.updateVisibility(player);
  }
  updateVisibility(player) {
    this.fieldOfView.updateVisibility(this, player);
  }
  drawTile(pos, context) {
    const tile = this.tiles.get(pos);
    if (!(tile instanceof Tile) || !this.isAccessible(pos)) {
      return;
    }

    const camera = this.gameScreen.camera;
    const transformedPosition = camera.transformedPosition(pos);

    if (this.isVisible(pos)) {
      this.drawTileRectangle(tile, transformedPosition, context);
    } else {
      const decreasedSize = 4;
      this.drawDecreasedTileRectangle(
        tile,
        transformedPosition,
        context,
        decreasedSize
      );
    }
  }
  drawTileRectangle(tile, position, context) {
    const rectPos = new Point(
      position.x * this.tileSize,
      position.y * this.tileSize
    );
    const rectSize = new Point(
      this.tileSize - this.gridWidth,
      this.tileSize - this.gridWidth
    );

    drawRectangle(context, rectPos, rectSize, tile.color);
  }
  drawDecreasedTileRectangle(tile, position, context, size) {
    const offset = (this.tileSize - size) / 2;
    const rectPos = new Point(
      position.x * this.tileSize + offset,
      position.y * this.tileSize + offset
    );
    const rectSize = new Point(size, size);

    drawRectangle(context, rectPos, rectSize, tile.color);
  }
  drawFromLayer(layer, pos, context) {
    const objectToDraw = layer.get(pos);
    if (objectToDraw == null || !isNonEmptyString(objectToDraw.char)) {
      return;
    }

    const char = this.isVisible(pos)
      ? objectToDraw.char
      : objectToDraw.obscuredChar;

    this.drawTilemapChar(context, pos, char);
  }
  drawTilemapChar(context, position, char) {
    const camera = this.gameScreen.camera;
    const transformedPosition = camera.transformedPosition(position);
    const translatedPos = new Point(
      transformedPosition.x * this.tileSize,
      transformedPosition.y * this.tileSize
    );
    const fontSize =
      this.tileSize - this.gridWidth - 2 + this.browserCharSizeDifference;

    drawText(
      context,
      char,
      fontSize,
      "white",
      translatedPos.x + this.charOffset.x,
      translatedPos.y + this.charOffset.y
    );
  }
  draw(context) {
    this.performOnTilesInViewport((pos) => {
      this.drawTile(pos, context);
      this.drawFromLayer(this.items, pos, context);
      this.drawFromLayer(this.creatures, pos, context);
    });
  }
}
