import GameState from "./gameState.js";
import {
  checkForTypeError,
  checkForTypeErrorNum,
  isFloat,
  isNumber,
} from "../utilities/utilities.js";
import UI from "../ui/ui.js";
import Player from "../mapObjects/creatures/player/player.js";
import MessageLog from "../ui/messageLog.js";
import Point from "../geometry/point.js";
import Camera from "../camera/camera.js";
import Flora from "../systems/flora.js";
import Interiors from "../systems/interiors.js";
import FieldOfView from "../systems/fieldOfView.js";

export default class GameScreen extends GameState {
  constructor(gameStates, canvas, input, content, sound) {
    super(gameStates);
    this.canvas = canvas;
    this.input = input;
    this.content = content;
    this.sound = sound;
    this.flora = new Flora();
    this.interiors = new Interiors();
    this.fieldOfView = new FieldOfView();
    this.ui = new UI(this);
    this.tileSize = 20;
    this.gridWidth = 1;
    this.addUIComponents();
    this.addPlayer();
    this.addCamera();
  }
  get tileSize() {
    return this._tileSize;
  }
  set tileSize(value) {
    if (!isNumber(value)) {
      throw new TypeError("tileSize must be an integer");
    }
    if (isFloat(value) || value <= 0) {
      throw new RangeError("tileSize must be a natural number bigger than 0");
    }
    this._tileSize = value;
  }
  get gridWidth() {
    return this._gridWidth;
  }
  set gridWidth(value) {
    checkForTypeErrorNum(value, "gridWidth");

    const minWidth = 0;
    const maxWidth = 5;

    if (value < minWidth || value > maxWidth) {
      throw new RangeError(
        "gridWidth must be between " + minWidth + " and " + maxWidth
      );
    }

    this._gridWidth = value;
  }
  get ui() {
    return this._ui;
  }
  set ui(value) {
    if (this.ui !== undefined) {
      throw Error("UI should only be set once");
    }
    checkForTypeError(value, "ui", UI);
    this._ui = value;
  }
  get player() {
    return this._player;
  }
  set player(value) {
    checkForTypeError(value, "value", Player);
    this._player = value;
  }
  get camera() {
    return this._camera;
  }
  set camera(value) {
    checkForTypeError(value, "value", Camera);
    this._camera = value;
  }
  addUIComponents() {
    this.addMessageLog();
  }
  addMessageLog() {
    const messageLogOffset = 10;
    const messageLogPosition = new Point(
      messageLogOffset,
      this.canvas.height - messageLogOffset
    );
    this.messageLog = new MessageLog(messageLogPosition);
    this.messageLog.maxMessages = 7;
    this.messageLog.queue("You wake up in this world with a smug face.");
  }
  addPlayer() {
    this.player = new Player(
      this,
      this.startingMap.startingPosition,
      this.startingMap
    );
  }
  addCamera() {
    const viewportWidth = this.canvas.width / this.tileSize;
    const viewportHeight = this.canvas.height / this.tileSize;
    const camera = new Camera(viewportWidth, viewportHeight);
    camera.target = this.player;
    this.camera = camera;
  }
  update(input) {
    this.ui.update(input);
    this.messageLog.update(input);
    this.player.update(input);
  }
  draw(context, canvas) {
    this.player.map.draw(context, this.camera);
    this.ui.draw(context);
    this.messageLog.draw(context);
  }
}
