import Point from "../../geometry/point.js";
import DungeonLevel from "./dungeonLevel.js";

export default class Dungeon {
  constructor(
    gameScreen,
    parentMap,
    parentEntrancePosition,
    dungeonDefinition
  ) {
    this.width = dungeonDefinition.width;
    this.height = dungeonDefinition.height;
    this.gameScreen = gameScreen;
    this.name = dungeonDefinition.name;
    this.music = this.fetchMusicFile(dungeonDefinition.musicAsset);
    this.lightLevel = 3; // TODO: should be pulled from dungeonDefinition
    this.minChambers = dungeonDefinition.minChambers;
    this.maxChambers = dungeonDefinition.maxChambers;
    this.minChamberSize = dungeonDefinition.minChamberSize;
    this.maxChamberSize = dungeonDefinition.maxChamberSize;
    this.erosion = dungeonDefinition.erosion;
    this.exitChar = dungeonDefinition.exitChar;
    this.levels = dungeonDefinition.levels;
    this.parentMap = parentMap;
    this.parentEntrancePosition = parentEntrancePosition;
    this.dungeonLevels = new Array();
  }
  fetchMusicFile(title) {
    if (title == "none" || title == "null") {
      return null;
    }
    const asset = this.gameScreen.content[title];

    if (asset == null) {
      throw new Error("could not find music file");
    }
    if (!asset instanceof Audio) {
      throw new TypeError("fetched asset is not audio");
    }
    return asset;
  }
  enter(mapObject) {
    this.addLevel(this.newLevel());
    const targetPosition = this.dungeonLevels[0].startingPosition;
    const targetMap = this.dungeonLevels[0];
    mapObject.move(targetPosition, targetMap);
  }
  addLevel(dungeonLevel) {
    this.dungeonLevels.push(dungeonLevel);
  }
  newLevel() {
    const levelId = this.dungeonLevels.length;
    const parentMap = this.getLevelParent(levelId);
    const parentEntrancePosition = this.getParentEntrancePosition(levelId);
    const newLevel = new DungeonLevel(
      this.gameScreen,
      parentMap,
      parentEntrancePosition,
      this,
      levelId
    );
    newLevel.generate();
    newLevel.populate();
    return newLevel;
  }
  getLevelParent(levelId) {
    if (levelId == 0) {
      return this.parentMap;
    }
    return this.dungeonLevels[levelId - 1];
  }
  getParentEntrancePosition(levelId) {
    if (levelId == 0) {
      return this.parentEntrancePosition;
    }
    const entrancePosition = this.dungeonLevels[levelId - 1].entrance.position;
    return new Point(entrancePosition.x, entrancePosition.y + 1);
  }
}
