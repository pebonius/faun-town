import Debug from "../utilities/debug.js";
import Point from "../geometry/point.js";
import { drawImage } from "../utilities/graphics.js";
import {
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
    this.entities = [];
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
  getTileImage(tileId) {
    return this.gameScreen.content.tiles[tileId];
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
  addEntity(entity) {
    const maxEntities = 10000;
    if (this.entities.length > maxEntities) {
      throw new Error(
        `there is a truckton of entities (${this.entities.length}), what?`
      );
    }

    this.entities.push(entity);
  }
  removeEntity(entity) {
    removeFromArray(this.entities, entity);
  }
  drawEntity(entity, context) {
    if (!isDefined(entity)) {
      throw new Error("entity is not defined, what are you tryne draw.");
    }

    checkForProps(entity, ["position", "sprite"]);

    const position = new Point(
      entity.position.x * this.tileSize.x,
      entity.position.y * this.tileSize.y
    );

    drawImage(context, entity.sprite, position, this.tileSize);
  }
  draw(context) {
    for (let y = 0; y < this.height; y++)
      for (let x = 0; x < this.width; x++) {
        var pos = new Point(x, y);
        this.drawTile(pos, context);
      }

    this.entities.forEach((entity) => {
      this.drawEntity(entity, context);
    });
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
    this.tiles = cloneArray(asset.tiles);
  }
}
