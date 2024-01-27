import Point from "../geometry/point.js";
import { drawRectangle, drawText } from "../utilities/graphics.js";
import Debug from "../utilities/debug.js";

export default class ControlButtons {
  constructor(canvas) {
    this.buttonSize = new Point(canvas.width * 0.09, canvas.width * 0.09);
    this.arrowsPosition = new Point(this.buttonSize.x * 2, canvas.height * 0.5);
    this.arrowsFontSize = this.buttonSize.x * 0.5;
    this.arrrowBgColor = "rgba(244, 244, 244, 0.3)";
    this.arrowFontColor = "black";
    this.textOffset = this.buttonSize.x * 0.3;

    this.upArrowPos = new Point(
      this.arrowsPosition.x - this.buttonSize.x * 0.5,
      this.arrowsPosition.y - this.buttonSize.y * 1.5
    );

    this.downArrowPos = new Point(
      this.arrowsPosition.x - this.buttonSize.x * 0.5,
      this.arrowsPosition.y + this.buttonSize.y * 0.5
    );

    this.leftArrowPos = new Point(
      this.arrowsPosition.x - this.buttonSize.x * 1.5,
      this.arrowsPosition.y - this.buttonSize.y * 0.5
    );

    this.rightArrowPos = new Point(
      this.arrowsPosition.x + this.buttonSize.x * 0.5,
      this.arrowsPosition.y - this.buttonSize.y * 0.5
    );
  }
  draw(context) {
    drawRectangle(context, this.arrowsPosition, new Point(1, 1), "red");
    this.drawArrow(context, this.upArrowPos, "^");
    this.drawArrow(context, this.downArrowPos, "v");
    this.drawArrow(context, this.leftArrowPos, "<");
    this.drawArrow(context, this.rightArrowPos, ">");
  }
  drawArrow(context, position, text) {
    drawRectangle(context, position, this.buttonSize, this.arrrowBgColor);
    drawText(
      context,
      text,
      this.arrowsFontSize,
      this.arrowFontColor,
      position.x + this.textOffset,
      position.y + this.textOffset
    );
  }
}
