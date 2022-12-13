import DrawableComponent from "./drawableComponent.js";

export default class Sprite extends DrawableComponent {
  constructor(image, position, size) {
    super(position, size, "ffffff");
    this.image = image;
  }
  drawAtSizeColor(context, position, size, color) {
    context.drawImage(this.image, position.x, position.y, size.x, size.y);
  }
}
