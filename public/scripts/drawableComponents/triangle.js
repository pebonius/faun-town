import DrawableComponent from "./drawableComponent.js";

export default class Triangle extends DrawableComponent {
  constructor(position, size, color) {
    super(position, size, color);
  }
  drawAtSizeColor(context, position, size, color) {
    super.drawAtSizeColor(context, position, size, color);
    context.beginPath();
    context.moveTo(position.x + size.x / 2, position.y);
    context.lineTo(position.x + size.x, position.y + size.y);
    context.lineTo(position.x, position.y + size.y);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
}
