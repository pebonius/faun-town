import Egg from "./egg.js";
import Creature from "./creature.js";

export default class Duck extends Creature {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "Duck";
    this.char = "🦆";
  }
  onTurn() {
    this.moveAtRandom();
  }
  onMoved(previousPosition) {
    this.doAtChance(0.5, () => {
      this.logMessage(this.name + " laid an egg.");
      new Egg(this.gameScreen, previousPosition, this.map);
    });
  }
}
