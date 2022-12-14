import Debug from "../utilities/debug.js";

export default class Tilemap {
  constructor(asset) {
    this.load(asset);
  }
  load(asset) {
    this.tiles = new Array(asset.tiles.length);

    for (let y = 0; y < this.tiles.length; y++) {
      this.tiles[y] = new Array(asset.tiles[y].length);
      const row = this.tiles[y];
      for (var x = 0; x < asset.tiles[y].length; x++) {
        const tileId = asset.tiles[y][x];
        row[x] = tileId;
      }
    }

    console.log(this.tiles);
  }
}
