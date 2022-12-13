export default class DrawableComponent {
  constructor(position, size, color) {
    this.position = position;
    this.size = size;
    this.color = color;
  }
  draw(context) {
    this.drawAt(context, this.position);
  }
  drawAt(context, position) {
    this.drawAtSize(context, position, this.size);
  }
  drawAtSize(context, position, size) {
    this.drawAtSizeColor(context, position, size, this.color);
  }
  drawAtSizeColor(context, position, size, color) {}
}
