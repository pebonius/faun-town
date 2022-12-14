import Debug from "../utilities/debug.js";
import Point from "../geometry/point.js";
import { drawImage } from "../utilities/graphics.js";
import { cloneArray } from "../utilities/utilities.js";

export default class Tilemap {
  constructor(gameScreen, asset) {
    this.gameScreen = gameScreen;
    this.load(asset);
    this.tileSize = new Point(32, 32);
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
    if (tileId == undefined) {
      return;
    }

    const tilePos = new Point(pos.x * this.tileSize.x, pos.y * this.tileSize.y);

    drawImage(context, this.getTileImage(tileId), tilePos, this.tileSize);
  }
  draw(context) {
    for (let y = 0; y < this.height; y++)
      for (let x = 0; x < this.width; x++) {
        var pos = new Point(x, y);
        this.drawTile(pos, context);
      }
  }
  drawFromCamera(context, camera) {
    const cameraPos = camera.position;

    for (let y = cameraPos.y; y < cameraPos.y + camera.viewportSize.y; y++)
      for (let x = cameraPos.x; x < cameraPos.x + camera.viewportSize.x; x++) {
        var pos = new Point(x, y);
        this.drawTile(pos, context);
      }
  }
  load(asset) {
    this.tiles = cloneArray(asset.tiles);
  }
}
