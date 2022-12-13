import {
  checkForTypeError,
  checkForTypeErrorNum,
} from "../utilities/utilities.js";
import Point from "../geometry/point.js";

export default class Particle {
  constructor(position, size, lifespan) {
    checkForTypeError(position, "position", Point);
    checkForTypeError(size, "size", Point);
    checkForTypeErrorNum(lifespan, "lifespan");
    this.position = new Point(position.x, position.y);
    this.size = size;
    this.life = 0;
    this.lifespan = lifespan;
  }
  update(input) {
    this.life += 0.1;
  }
  remove() {
    this.life = this.lifespan;
  }
  isDead() {
    return this.life >= this.lifespan;
  }
}
