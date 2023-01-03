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
    this.position = new Point(20, 360);
    this.size = new Point(600, 100);
    this.bgColor = "gray";
    this.fontSize = 20;
    this.textColor = "white";
    this.textPosition = new Point(this.position.x + 10, this.position.y + 10);
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
      if (input.isKeyPressed(input.keys.ENTER)) {
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
        20,
        this.textColor,
        this.textPosition.x,
        this.textPosition.y
      );
    }
  }
}
