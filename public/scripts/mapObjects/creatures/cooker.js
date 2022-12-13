import Creature from "./creature.js";

export default class Cooker extends Creature {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "Cooker";
    this.char = "🫕";
  }
  onTurn() {}
}
