import Creature from "./creature.js";

export default class Chair extends Creature {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "Chair";
    this.char = "🪑";
  }
  onTurn() {}
}
