import MapObject from "../mapObject.js";
import Point from "../../geometry/point.js";

export default class Item extends MapObject {
  constructor(gameScreen, position, map) {
    super(gameScreen);
    this.name = "undefined item";
    if (position instanceof Point) {
      const layer = map.items;
      this.placeOnMap(new Point(position.x, position.y), map, layer);
    }
  }
  get defaultInteractGroundMessage() {
    return "You see a " + this.name.toUpperCase() + " on the ground.";
  }
  interactGround(user) {
    this.logMessage(this.defaultInteractGroundMessage);
  }
  use(user) {}
}
