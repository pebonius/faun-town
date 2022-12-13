import {
  checkForTypeError,
  isNonEmptyString,
  isNumber,
} from "../utilities/utilities.js";
import Point from "../geometry/point.js";
import Label from "./label.js";

export default class MessageLog {
  constructor(position) {
    checkForTypeError(position, "position", Point);
    this.messages = [];
    this.maxMessages = 20;
    this.maxMessageLenght = 60;
    this.messageQueue = [];
    this.waitTime = 0;
    this.waitQueue = [];
    this.fontSize = 16;
    this.messageSpacing = 2;
    this.position = new Point(position.x, position.y);
  }
  log(messageText, color = "white") {
    if (messageText.length > this.maxMessageLenght) {
      this.splitMessage(messageText, color);
    } else {
      this.writeMessage(messageText, color);
    }
  }
  writeMessage(messageText, color = "white") {
    this.messages.push(
      new Label(
        messageText,
        new Point(0, 0),
        this.fontSize,
        color,
        "rgba(0, 0, 0, 0.5)"
      )
    );
    this.removeOldMessages();
  }
  removeOldMessages() {
    if (this.messages.length > this.maxMessages) {
      this.messages = this.messages.slice(
        this.messages.length - this.maxMessages,
        this.messages.length
      );
    }
  }
  splitMessage(message, color) {
    if (isNonEmptyString(message)) {
      let words = [];
      let currentLine = "";

      words = message.split(" ");

      for (let i = 0; i < words.length; i++) {
        const currentWord = words[i];

        if (isNonEmptyString(currentLine)) {
          currentLine += " ";
        }

        if (currentLine.length + currentWord.length <= this.maxMessageLenght) {
          currentLine += currentWord;
        } else {
          this.writeMessage(currentLine, color);
          currentLine = currentWord;
        }
      }

      if (isNonEmptyString(currentLine)) {
        this.log(currentLine, color);
      }
    }
  }
  queue(message, time = 0, color = "white") {
    this.messageQueue.push({
      messageText: message,
      color: color,
    });
    if (isNumber(time)) {
      this.waitQueue.push(time);
    }
  }
  logFromQueue() {
    if (this.messageQueue.length > 0) {
      this.log(this.messageQueue[0].messageText, this.messageQueue[0].color);
      this.messageQueue.shift();
    }
  }
  waitFromQueue() {
    if (this.waitQueue.length > 0) {
      this.waitTime = this.waitQueue[0];
      this.waitQueue.shift();
    }
  }
  isEmpty() {
    return this.messageQueue.length <= 0 && this.waitQueue.length <= 0;
  }
  update(input) {
    if (this.waitTime <= 0) {
      this.logFromQueue();
      this.waitFromQueue();
    } else {
      this.waitTime--;
    }
  }
  draw(context) {
    for (let i = 0; i < this.messages.length; i++) {
      this.messages[i].draw(
        context,
        new Point(
          this.position.x,
          this.position.y -
            (this.fontSize + this.messageSpacing) * (this.messages.length - i)
        )
      );
    }
  }
}
