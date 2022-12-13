import Creature from "./creature.js";

export default class ToiletBowl extends Creature {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "Toilet Bowl";
    this.char = "🚽";
  }
  onTurn() {}
}
