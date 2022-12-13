import ChamberTree from "../../procGen/chamberTree.js";
import Passage from "../../mapObjects/creatures/passage.js";
import Point from "../../geometry/point.js";
import Tilemap from "../tilemap.js";
import { checkForTypeErrorNum } from "../../utilities/utilities.js";
import { randomNumber } from "../../utilities/utilities.js";
import Tile from "../tile.js";

export default class DungeonLevel extends Tilemap {
  constructor(gameScreen, parentMap, parentEntrancePosition, dungeon, levelId) {
    super(dungeon.width, dungeon.height, gameScreen);
    this.dungeon = dungeon;
    this.levelId = levelId;
    this.name = dungeon.name + " (level " + (this.levelId + 1) + ")";
    this.music = dungeon.music;
    this.lightLevel = dungeon.lightLevel;
    this.setNumberOfChambers(
      randomNumber(dungeon.minChambers, dungeon.maxChambers)
    );
    this.minChamberSize = dungeon.minChamberSize;
    this.maxChamberSize = dungeon.maxChamberSize;
    this.erosion = dungeon.erosion;
    this.exitChar = dungeon.exitChar;
    this.parentMap = parentMap;
    this.parentEntrancePosition = parentEntrancePosition;
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
  getNumberOfChambers() {
    return this.numberOfChambers;
  }
  setNumberOfChambers(value) {
    checkForTypeErrorNum(value);
    if (value >= 1) {
      this.numberOfChambers = value;
    } else {
      throw new RangeError("Provided numberOfChambers must be >= 1.");
    }
  }
  generate() {
    this.fillWithType(this.bounds, this.wallType);
    this.addChamberTree();
    this.erode();
    this.addStartingChamber();
    this.addExit();
    if (this.levelId < this.dungeon.levels - 1) {
      this.addNextLevelEntrance();
    }
  }
  addChamberTree() {
    this.chamberTree = new ChamberTree(
      this.bounds,
      this.numberOfChambers,
      this.numberOfChambers,
      this.minChamberSize,
      this.maxChamberSize,
      []
    );

    this.chamberTree.fillTreeWithTileType(this.floorType, this);
  }
  addStartingChamber() {
    const startingChamber = this.chamberTree.getChamber(0);
    this.startingPosition = new Point(
      startingChamber.center.x,
      startingChamber.center.y + 1
    );
    this.exitPos = startingChamber.center;
    this.tiles.set(this.exitPos, new Tile(this.floorType));
    this.tiles.set(this.startingPosition, new Tile(this.floorType));
  }
  erode() {
    if (this.erosion) {
      this.erodeTiles(1, this.floorType, this.wallType);
    }
  }
  addExit() {
    this.exit = new Passage(
      this.gameScreen,
      this.exitPos,
      this,
      this.exitChar,
      this.parentEntrancePosition,
      this.parentMap
    );
  }
  addNextLevelEntrance() {
    this.entranceChamber = this.chamberTree.getChamber(
      this.chamberTree.getLastChamberIndex()
    );
    this.entrancePosition = this.entranceChamber.center;
    this.entrance = new Passage(
      this.gameScreen,
      this.entrancePosition,
      this,
      "🕳️",
      new Point(0, 0),
      this
    );
    this.entrance.onCollision = (collider) => {
      this.entranceOnCollision(collider);
    };
  }
  entranceOnCollision(collider) {
    if (this.dungeon.dungeonLevels[this.levelId + 1] === undefined) {
      this.enterNewLevel(collider);
      return;
    }
    this.enterNextLevel(collider);
  }
  enterNewLevel(collider) {
    const newLevel = this.dungeon.newLevel();
    this.dungeon.addLevel(newLevel);
    const targetPosition = newLevel.startingPosition;
    const targetMap = newLevel;
    collider.move(targetPosition, targetMap);
  }
  enterNextLevel(collider) {
    const nextLevel = this.dungeon.dungeonLevels[this.levelId + 1];
    const targetPosition = nextLevel.startingPosition;
    const targetMap = nextLevel;
    collider.move(targetPosition, targetMap);
  }
  populate() {}
}
