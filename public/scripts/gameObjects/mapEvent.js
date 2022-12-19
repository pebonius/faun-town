import Point from "../geometry/point.js";
import { isNonEmptyString } from "../utilities/utilities.js";
import Entity from "./entity.js";

export default class MapEvent extends Entity {
  constructor(gameScreen, map, data) {
    super(gameScreen);
    this.load(map, data);
  }
  load(map, data) {
    const position = new Point(data.posX, data.posY);
    this.placeOnMap(position, map);

    if (isNonEmptyString(data.sprite)) {
      this.sprite = data.sprite;
    } else {
      this.sprite = this.gameScreen.content.pc;
    }
  }
}
