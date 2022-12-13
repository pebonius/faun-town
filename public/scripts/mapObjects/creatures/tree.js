import { isFunction, passPercentileRoll } from "../../utilities/utilities.js";
import Creature from "./creature.js";

export default class Tree extends Creature {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "Tree";
    this.char = "🌳";
  }
  onTurn() {
    const newChestnut = this.map.flora.newChestnut;
    if (isFunction(newChestnut)) {
      this.generateChestnuts(newChestnut);
    }
  }
  generateChestnuts(newChestnut) {
    const dropChestnutChance = 0.01;
    const dropPosition = this.map.freeNeighborPosition(this.position);
    if (passPercentileRoll(dropChestnutChance) && dropPosition != null) {
      const chestnut = newChestnut(this.map, dropPosition);
      this.logDropMessage(chestnut);
    }
  }
}
