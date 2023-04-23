import {
  removeDead,
  checkForTypeError,
  isFunction,
  checkForArray,
  lastElementInArray,
} from "./utilities/utilities.js";
import { clearContext } from "./utilities/graphics.js";
import SoundManager from "./managers/soundManager.js";
import CreditsManager from "./managers/creditsManager.js";
import InputManager from "./managers/inputManager.js";
import ContentManager from "./managers/contentManager.js";
import LoadingScreen from "./gameStates/loadingScreen.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.content = new ContentManager();
    this.sound = new SoundManager();
    this.credits = new CreditsManager();
    this.input = new InputManager(canvas);
    this.gameStates = new Array();
    this.isRunning = false;
  }
  get canvas() {
    return this._canvas;
  }
  set canvas(value) {
    if (!isFunction(value.getContext)) {
      throw new TypeError("canvas must be an HTMLCanvasElement");
    }
    value.oncontextmenu = (e) => {
      e.preventDefault();
    };
    value.getContext("2d").imageSmoothingEnabled = false;
    this._canvas = value;
  }
  get context() {
    return this.canvas.getContext("2d");
  }
  get content() {
    return this._content;
  }
  set content(value) {
    checkForTypeError(value, "content", ContentManager);
    this._content = value;
  }
  get sound() {
    return this._sound;
  }
  set sound(value) {
    checkForTypeError(value, "sound", SoundManager);
    this._sound = value;
  }
  get credits() {
    return this._credits;
  }
  set credits(value) {
    checkForTypeError(value, "credits", CreditsManager);
    this._credits = value;
  }
  get input() {
    return this._input;
  }
  set input(value) {
    checkForTypeError(value, "input", InputManager);
    this._input = value;
  }
  get gameStates() {
    return this._gameStates;
  }
  set gameStates(value) {
    if (!Array.isArray(value)) {
      throw new TypeError("gameStates must be an array");
    }
    this._gameStates = value;
  }
  get isRunning() {
    return this._isRunning;
  }
  set isRunning(value) {
    if (!typeof value == "boolean") {
      throw new TypeError("isRunning must be a boolean");
    }
    this._isRunning = value;
  }
  initialize() {
    this.credits.tryFetchCredits("./CREDITS.txt");
    this.input.addEvents();
    this.input.addKeys();
    this.gameStates.push(
      new LoadingScreen(
        this.gameStates,
        this.canvas,
        this.input,
        this.content,
        this.sound
      )
    );
    this.isRunning = true;
    var self = this;
    requestAnimationFrame(() => self.gameLoop(self));
  }
  update() {
    this.input.update();
    removeDead(this.gameStates);
    if (this.gameStates.length <= 0) {
      throw new Error("no game state to process");
    }
    lastElementInArray(this.gameStates).update(this.input);
  }
  draw() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    clearContext(this.context, this.canvas);
    lastElementInArray(this.gameStates).draw(this.context, this.canvas);
  }
  gameLoop(self) {
    self.update();
    self.draw();
    if (self.isRunning) {
      requestAnimationFrame(() => self.gameLoop(self));
    }
  }
}
