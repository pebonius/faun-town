import Duck from "./duck.js";
import Creature from "./creature.js";

export default class Chick extends Creature {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "chick";
    this.turnsElapsed = 0;
    this.char = "🐤";
  }
  onTurn() {
    const turnsToGrow = 100;
    this.turnsElapsed++;

    this.moveAtRandom();

    if (this.turnsElapsed >= turnsToGrow) {
      this.removeFromMap();
      new Duck(this.gameScreen, this.position, this.map);
    }
  }
}
