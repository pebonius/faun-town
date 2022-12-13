import Debug from "../utilities/debug.js";
import {
  arrayContains,
  checkForArray,
  clearArray,
  isFunction,
  lastElementInArray,
  removeFromArray,
} from "../utilities/utilities.js";

export default class UI {
  constructor(gameState) {
    this.gameState = gameState;
    this.inputSubscribers = [];
    this.gameState.input.addMouseClickSubscriber(this);
  }
  get maxSubscribers() {
    return 100;
  }
  get inputSubscribers() {
    return this._inputSubscribers;
  }
  set inputSubscribers(value) {
    checkForArray(value, "inputSubscribers");

    this._inputSubscribers = value;
  }
  get topInputSubscriber() {
    const topSubscriber = lastElementInArray(this.inputSubscribers);

    if (
      !isFunction(topSubscriber.handleKeyInput) &&
      !isFunction(topSubscriber.handleMouseClick)
    ) {
      throw new Error("top input subscriber cannot handle input! what!?");
    }

    return topSubscriber;
  }
  get topInputSubscriberExists() {
    return (
      this.inputSubscribers.length > 0 && this.topInputSubscriber != undefined
    );
  }
  addInputSubscriber(subscriber) {
    if (this.inputSubscribers.length >= this.maxSubscribers) {
      Debug.log("too many ui inputSubscribers!");
    }

    if (
      !isFunction(subscriber.handleKeyInput) &&
      !isFunction(subscriber.handleMouseClick)
    ) {
      throw new Error("trying to add input subscriber who cannot handle input");
    }

    if (arrayContains(this.inputSubscribers, subscriber)) {
      throw new Error("trying to add same input subscriber twice");
    }

    this.inputSubscribers.push(subscriber);
  }
  removeInputSubscriber(subscriber) {
    removeFromArray(this.inputSubscribers, subscriber);
  }
  clearInputSubscribers() {
    clearArray(this.inputSubscribers);
  }
  update(input) {
    this.handleKeyInput(input);
  }
  draw(context) {}
  handleKeyInput(input) {
    /*
    To handle global UI input:
      if (input.isKeyPressed(input.keys.SPACE)) {
        Debug.log("oi someone pressed space");
      }
    */

    this.handleSubscribersKeyInput(input);
  }
  handleSubscribersKeyInput(input) {
    if (
      !this.topInputSubscriberExists ||
      !isFunction(this.topInputSubscriber.handleKeyInput)
    ) {
      return;
    }

    this.topInputSubscriber.handleKeyInput(input);
  }
  handleMouseClick(input, clickEvent) {
    Debug.log(
      "click at: " +
        input.cursorPosition(clickEvent).x +
        ", " +
        input.cursorPosition(clickEvent).y
    );

    this.handleSubscribersMouseClick(input, clickEvent);
  }
  handleSubscribersMouseClick(input, clickEvent) {
    if (
      !this.topInputSubscriberExists ||
      !isFunction(this.topInputSubscriber.handleMouseClick)
    ) {
      return;
    }

    this.topInputSubscriber.handleMouseClick(input, clickEvent);
  }
}
