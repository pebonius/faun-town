import Debug from "../utilities/debug.js";
import Point from "../geometry/point.js";
import { drawImage } from "../utilities/graphics.js";
import {
  arrayContains,
  checkForProps,
  cloneArray,
  isDefined,
  isNumber,
  removeFromArray,
} from "../utilities/utilities.js";

export default class Tilemap {
  constructor(gameScreen, asset) {
    this.gameScreen = gameScreen;
    this.load(asset);
    this.tileSize = new Point(64, 48);
    this.addEntitiesLayer();
  }
  toString() {
    return "tilemap";
  }
  get width() {
    return this.tiles.length;
  }
  get height() {
    return this.tiles[0].length;
  }
  addEntitiesLayer() {
    this.entities = new Array(this.height);

    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i] = new Array(this.width);
    }
  }
  containsPosition(pos) {
    return (
      pos.x >= 0 && pos.x < this.width && pos.y >= 0 && pos.y < this.height
    );
  }
  getTile(pos) {
    if (this.containsPosition(pos)) {
      return this.tiles[pos.y][pos.x];
    }
    return null;
  }
  getTileImage(tileId) {
    return this.gameScreen.content.tiles[tileId];
  }
  getTileWalkable(tileId) {
    return arrayContains(this.walkableTiles, tileId);
  }
  isWalkable(pos) {
    return this.getTileWalkable(this.getTile(pos));
  }
  drawTile(pos, context) {
    const tileId = this.tiles[pos.y][pos.x];
    if (tileId === undefined) {
      return;
    }

    if (!isNumber(tileId)) {
      throw new Error(`tileId should be a number, and it's ${tileId}`);
    }

    const tilePos = new Point(pos.x * this.tileSize.x, pos.y * this.tileSize.y);

    drawImage(context, this.getTileImage(tileId), tilePos, this.tileSize);
  }
  getEntity(pos) {
    if (this.containsPosition(pos)) {
      return this.entities[pos.y][pos.x];
    }
    return null;
  }
  setEntity(pos, value) {
    if (this.containsPosition(pos)) {
      this.entities[pos.y][pos.x] = value;
    }
  }
  removeEntity(value) {
    this.setEntity(value.position, null);
  }
  drawEntity(pos, context) {
    const entity = this.getEntity(pos);

    if (!isDefined(entity) || !isDefined(entity.sprite)) {
      return;
    }

    const transformedPos = new Point(
      pos.x * this.tileSize.x,
      pos.y * this.tileSize.y
    );

    drawImage(context, entity.sprite, transformedPos, this.tileSize);
  }
  draw(context) {
    for (let y = 0; y < this.height; y++)
      for (let x = 0; x < this.width; x++) {
        var pos = new Point(x, y);
        this.drawTile(pos, context);
        this.drawEntity(pos, context);
      }
  }
  // drawFromCamera(context, camera) {
  //   const cameraPos = camera.position;

  //   for (let y = cameraPos.y; y < cameraPos.y + camera.viewportSize.y; y++)
  //     for (let x = cameraPos.x; x < cameraPos.x + camera.viewportSize.x; x++) {
  //       var pos = new Point(x, y);
  //       this.drawTile(pos, context);
  //     }
  // }
  load(asset) {
    this.walkableTiles = cloneArray(asset.walkableTiles);
    this.tiles = cloneArray(asset.tiles);
  }
}
