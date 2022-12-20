import Debug from "../utilities/debug.js";
import Point from "../geometry/point.js";
import Entity from "./entity.js";

export default class Player extends Entity {
  constructor(gameScreen, data) {
    super(gameScreen);
    this.sprite = this.gameScreen.content.pc;
    this.inputDelay = 10;
    this.inputCooldown = 0;
    this.load(data);
  }
  load(data) {
    this.name = data.name;
    const startingMap = this.gameScreen.getMapById(data.map);
    const startingPosition = new Point(data.posX, data.posY);
    this.placeOnMap(startingPosition, startingMap);
  }
  update(input) {
    this.endTurn = false;

    this.updateInputCooldown();

    if (!this.takesInput()) {
      return;
    }

    this.handleKeyInput(input);

    this.checkIfResetInputCooldown(input);

    this.checkTurnUpdate();
  }
  checkTurnUpdate() {
    if (this.endTurn) {
      this.map.onTurn(this);
    }
  }
  checkIfResetInputCooldown(input) {
    if (this.isInputCooldownReset(input)) {
      this.resetInputCooldown();
    }
  }
  resetInputCooldown() {
    this.inputCooldown = this.inputDelay;
  }
  updateInputCooldown() {
    if (this.inputCooldown > 0) {
      this.inputCooldown--;
    }
  }
  takesInput() {
    return this.inputCooldown == 0;
  }
  isInputCooldownReset(input) {
    const resettingInputs = [
      input.keys.UP,
      input.keys.DOWN,
      input.keys.LEFT,
      input.keys.RIGHT,
      input.keys.SHIFT,
      input.keys.CTRL,
      input.keys.NUM1,
      input.keys.NUM2,
      input.keys.NUM3,
      input.keys.NUM4,
      input.keys.NUM5,
      input.keys.NUM6,
      input.keys.NUM7,
      input.keys.NUM8,
      input.keys.NUM9,
      input.keys.NUM0,
    ];

    for (let i = 0; i < resettingInputs.length; i++) {
      if (input.isKeyDown(resettingInputs[i])) {
        this.resetInputCooldown();
        return;
      }
    }
  }
  wait() {
    Debug.log(`${this} is waiting`);
    return true;
  }
  handleKeyInput(input) {
    if (input.isKeyDown(input.keys.NUM8) || input.isKeyDown(input.keys.UP)) {
      this.endTurn = this.move(
        new Point(this.position.x, this.position.y - 1),
        this.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM2) ||
      input.isKeyDown(input.keys.DOWN)
    ) {
      this.endTurn = this.move(
        new Point(this.position.x, this.position.y + 1),
        this.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM4) ||
      input.isKeyDown(input.keys.LEFT)
    ) {
      this.endTurn = this.move(
        new Point(this.position.x - 1, this.position.y),
        this.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM6) ||
      input.isKeyDown(input.keys.RIGHT)
    ) {
      this.endTurn = this.move(
        new Point(this.position.x + 1, this.position.y),
        this.map
      );
    } else if (input.isKeyDown(input.keys.NUM7)) {
      this.endTurn = this.move(
        new Point(this.position.x - 1, this.position.y - 1),
        this.map
      );
    } else if (input.isKeyDown(input.keys.NUM9)) {
      this.endTurn = this.move(
        new Point(this.position.x + 1, this.position.y - 1),
        this.map
      );
    } else if (input.isKeyDown(input.keys.NUM1)) {
      this.endTurn = this.move(
        new Point(this.position.x - 1, this.position.y + 1),
        this.map
      );
    } else if (input.isKeyDown(input.keys.NUM3)) {
      this.endTurn = this.move(
        new Point(this.position.x + 1, this.position.y + 1),
        this.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM5) ||
      input.isKeyDown(input.keys.SHIFT)
    ) {
      this.endTurn = this.wait();
    }
  }
  resolveCollision(collider) {
    collider.onCollision(this);
  }
}
