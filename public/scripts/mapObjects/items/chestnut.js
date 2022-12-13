import Item from "./item.js";

export default class Chestnut extends Item {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "chestnut";
    this.char = "🌰";
  }
}
