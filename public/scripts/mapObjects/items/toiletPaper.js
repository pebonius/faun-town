import Item from "./item.js";

export default class ToiletPaper extends Item {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "toilet paper";
    this.char = "🧻";
  }
}
