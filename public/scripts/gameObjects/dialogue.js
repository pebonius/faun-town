import Point from "../geometry/point.js";
import { drawRectangle, drawText } from "../utilities/graphics.js";
import {
  checkForArray,
  cloneArray,
  isDefined,
  isNonEmptyString,
} from "../utilities/utilities.js";

export default class Dialogue {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.canvas = gameScreen.canvas;
    this.position = new Point(
      this.canvas.width * 0.03,
      this.canvas.height * 0.76
    );
    this.size = new Point(this.canvas.width * 0.93, this.canvas.height * 0.2);
    this.bgColor = "gray";
    this.fontSize = this.canvas.width * 0.03;
    this.textColor = "white";
    this.textPosition = new Point(
      this.position.x + this.canvas.width * 0.015,
      this.position.y + this.canvas.height * 0.015
    );
  }
  playDialogue(messages) {
    checkForArray(messages, "messages");
    this.messages = cloneArray(messages);
  }
  hasMessages() {
    return (
      Array.isArray(this.messages) &&
      this.messages.length > 0 &&
      isNonEmptyString(this.messages[0])
    );
  }
  hasNextMessage() {
    return (
      Array.isArray(this.messages) &&
      this.messages.length > 1 &&
      isNonEmptyString(this.messages[1])
    );
  }
  displayNextMessage() {
    this.messages.splice(0, 1);
  }
  update(input) {
    if (this.hasMessages()) {
      if (input.isKeyPressed(input.keys.ENTER) || input.isEnterClick()) {
        this.displayNextMessage();
      }
    }
  }
  draw(context) {
    if (this.hasMessages()) {
      drawRectangle(context, this.position, this.size, this.bgColor);
      drawText(
        context,
        this.messages[0],
        this.fontSize,
        this.textColor,
        this.textPosition.x,
        this.textPosition.y
      );
    }
  }
}
