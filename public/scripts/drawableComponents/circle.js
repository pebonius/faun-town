import Point from "../geometry/point.js";
import DrawableComponent from "./drawableComponent.js";

export default class Circle extends DrawableComponent {
  constructor(position, radius, color) {
    super(position, new Point(radius, radius), color);
    this.radius = radius;
  }
  drawAt(context, position) {
    this.drawAtSize(context, position, this.radius);
  }
  drawAtSize(context, position, radius) {
    this.drawAtSizeColor(context, position, radius, this.color);
  }
  drawAtSizeColor(context, position, radius, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    context.fill();
  }
  contains(point) {
    return (
      Point.calculateDistance(
        this.position.x,
        this.position.y,
        point.x,
        point.y
      ) <=
      this.size.x / 2
    );
  }
  static intersects(circA, circB) {
    return (
      Point.distance(circA.position, circB.position) <=
      circA.size.x / 2 + circB.size.x / 2
    );
  }
}
