import Point from "../geometry/point.js";
import Debug from "../utilities/debug.js";
import { isNonEmptyString } from "../utilities/utilities.js";
import Entity from "./entity.js";

export default class MapEvent extends Entity {
  constructor(gameScreen, map, data) {
    super(gameScreen);
    this.load(map, data);
  }
  onCollision(collider) {
    super.onCollision(collider);
  }
  load(map, data) {
    this.name = data.name;
    const position = new Point(data.posX, data.posY);
    this.placeOnMap(position, map);

    if (isNonEmptyString(data.sprite)) {
      this.sprite = data.sprite;
    } else {
      this.sprite = this.gameScreen.content.pc;
    }
  }
}
