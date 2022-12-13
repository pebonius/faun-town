import Creature from "./creature.js";

export default class GreatWizard extends Creature {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "great wizard";
    this.char = "🧙‍♂️";
  }
}
