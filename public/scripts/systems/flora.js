import Tree from "../mapObjects/creatures/tree.js";
import Chestnut from "../mapObjects/items/chestnut.js";
import { passPercentileRoll } from "../utilities/utilities.js";

export default class Flora {
  constructor() {}
  addWoodland(bounds, tilemap, densityPercent) {
    const chanceToAddTree = densityPercent;

    tilemap.performOnTiles(bounds, (pos) => {
      if (
        tilemap.isSurroundedByFloor(pos) &&
        passPercentileRoll(chanceToAddTree)
      ) {
        this.newTree(tilemap, pos);
      }
    });
  }
  newTree(tilemap, pos) {
    return new Tree(tilemap.gameScreen, pos, tilemap);
  }
  newChestnut(tilemap, pos) {
    return new Chestnut(tilemap.gameScreen, pos, tilemap);
  }
}
