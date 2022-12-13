import Creature from "./creature.js";
import Point from "../../geometry/point.js";
import Dungeon from "../../tilemap/dungeons/dungeon.js";
import DungeonDefinition from "../../tilemap/dungeons/dungeonDefinition.js";

export default class DungeonEntrance extends Creature {
  constructor(gameScreen, position, map, char, dungeonDefinitionAsset) {
    super(gameScreen, position, map);
    this.name = "dungeon entrance";
    this.char = char;
    this.dungeonDefinition = new DungeonDefinition();
    this.dungeonDefinitionAsset = dungeonDefinitionAsset;
  }
  get dungeonDefinition() {
    return this._dungeonDefinition;
  }
  set dungeonDefinition(value) {
    this._dungeonDefinition = value;
  }
  get dungeonDefinitionAsset() {
    return this._dungeonDefinitionAsset;
  }
  set dungeonDefinitionAsset(value) {
    this._dungeonDefinitionAsset = value;
    this.dungeonDefinition.load(value);
  }
  onCollision(collider) {
    const exitPos = new Point(this.position.x, this.position.y + 1);
    const dungeon = new Dungeon(
      this.gameScreen,
      this.map,
      exitPos,
      this.dungeonDefinition
    );
    dungeon.enter(collider);
  }
}
