import Chick from "./chick.js";
import Creature from "./creature.js";

export default class Egg extends Creature {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "Egg";
    this.char = "🥚";
    this.turnsElapsed = 0;
  }
  onTurn() {
    const turnsToHatch = 10;
    this.turnsElapsed++;

    if (this.turnsElapsed >= turnsToHatch) {
      this.logMessage("An egg just hatched.");
      this.removeFromMap();
      new Chick(this.gameScreen, this.position, this.map);
    }
  }
}
