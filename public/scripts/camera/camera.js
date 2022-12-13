import Point from "../geometry/point.js";
import { checkForTypeError } from "../utilities/utilities.js";

export default class Camera {
  constructor(viewportWidth, viewportHeight) {
    this.viewportSize = new Point(viewportWidth, viewportHeight);
  }
  get viewportSize() {
    return this._viewportSize;
  }
  set viewportSize(value) {
    checkForTypeError(value, "value", Point);
    if (value.x <= 0 || value.y <= 0) {
      return RangeError("viewportSize.x and y must be >= 1");
    }
    this._viewportSize = value;
  }
  get position() {
    if (this.target.position instanceof Point) {
      return new Point(
        this.target.position.x - this.viewportSize.x / 2,
        this.target.position.y - this.viewportSize.y / 2
      );
    }
    throw new ReferenceError("Target or target position is undefined.");
  }
  get target() {
    return this._target;
  }
  set target(value) {
    checkForTypeError(value.position, "target.position", Point);
    this._target = value;
  }
  get cameraTransform() {
    const position = this.target.position;
    checkForTypeError(position, "pos", Point);
    return new Point(
      position.x - this.viewportSize.x / 2,
      position.y - this.viewportSize.y / 2
    );
  }
  transformedPosition(position) {
    checkForTypeError(position, "position", Point);
    return new Point(
      position.x - this.cameraTransform.x,
      position.y - this.cameraTransform.y
    );
  }
}
