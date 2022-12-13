import Creature from "../creature.js";
import {
  removeDead,
  isNonEmptyString,
  isFunction,
  isBool,
} from "../../../utilities/utilities.js";
import PlayerInputController from "./playerInputController.js";

export default class Player extends Creature {
  constructor(gameScreen, position, map) {
    super(gameScreen, position, map);
    this.name = "player";
    this.char = "😏";
    this.endTurn = false;
    this.playerStates = new Array();
    this.inputController = new PlayerInputController();
  }
  get inputController() {
    return this._inputController;
  }
  set inputController(value) {
    if (!isFunction(value.handleKeyInput)) {
      throw new TypeError("input controller must be able to handle input");
    }

    this._inputController = value;
  }
  get endTurn() {
    return this._endTurn;
  }
  set endTurn(value) {
    if (!isBool(value)) {
      throw new TypeError("endTurn must be a bool");
    }

    this._endTurn = value;
  }
  update(input) {
    this.endTurn = false;
    super.update(input);
    this.inputController.update(input, this);
    this.checkTurnUpdate();
  }
  checkTurnUpdate() {
    if (this.endTurn) {
      this.map.onTurn(this);
    }
  }
  wait() {
    return true;
  }
  ground() {
    const itemOnGround = this.map.items.get(this.position);
    if (
      itemOnGround != null &&
      typeof itemOnGround.interactGround === "function"
    ) {
      itemOnGround.interactGround(this);
      return true;
    }
    this.logMessage("There is nothing on the ground.");
    return false;
  }
  resolveCollision(collider) {
    collider.onCollision(this);
  }
  onTurn() {
    super.onTurn();
    this.turnStates();
  }
  onEnterMap(map) {
    if (map == null) {
      throw new ReferenceError("map should not be null");
    }
    if (isNonEmptyString(map.name)) {
      this.logMessage("You are now in " + map.name.toUpperCase() + ".");
    }
    if (isFunction(map.playMusic)) {
      map.playMusic();
    }
  }
  turnStates() {
    if (Array.isArray(this.playerStates)) {
      removeDead(this.playerStates);
      for (let i = 0; i < this.playerStates.length; i++) {
        this.playerStates[i].onTurn();
      }
    }
  }
}
