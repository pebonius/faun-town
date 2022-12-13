import Point from "../../../geometry/point.js";

export default class PlayerInputController {
  constructor() {
    this.inputDelay = 10;
    this.inputCooldown = 0;
  }
  update(input, player) {
    this.updateInputCooldown();

    if (!this.takesInput()) {
      return;
    }

    this.handleKeyInput(input, player);

    this.checkIfResetInputCooldown(input);
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
  handleKeyInput(input, player) {
    if (
      input.isKeyDown(input.keys.NUM5) ||
      input.isKeyDown(input.keys.SHIFT)
    ) {
      player.endTurn = player.wait();
    } else if (
      input.isKeyDown(input.keys.NUM0) ||
      input.isKeyDown(input.keys.CTRL)
    ) {
      player.endTurn = player.ground();
    } else if (
      input.isKeyDown(input.keys.NUM8) ||
      input.isKeyDown(input.keys.UP)
    ) {
      player.endTurn = player.move(
        new Point(player.getPosition().x, player.getPosition().y - 1),
        player.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM2) ||
      input.isKeyDown(input.keys.DOWN)
    ) {
      player.endTurn = player.move(
        new Point(player.getPosition().x, player.getPosition().y + 1),
        player.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM4) ||
      input.isKeyDown(input.keys.LEFT)
    ) {
      player.endTurn = player.move(
        new Point(player.getPosition().x - 1, player.getPosition().y),
        player.map
      );
    } else if (
      input.isKeyDown(input.keys.NUM6) ||
      input.isKeyDown(input.keys.RIGHT)
    ) {
      player.endTurn = player.move(
        new Point(player.getPosition().x + 1, player.getPosition().y),
        player.map
      );
    } else if (input.isKeyDown(input.keys.NUM7)) {
      player.endTurn = player.move(
        new Point(player.getPosition().x - 1, player.getPosition().y - 1),
        player.map
      );
    } else if (input.isKeyDown(input.keys.NUM9)) {
      player.endTurn = player.move(
        new Point(player.getPosition().x + 1, player.getPosition().y - 1),
        player.map
      );
    } else if (input.isKeyDown(input.keys.NUM1)) {
      player.endTurn = player.move(
        new Point(player.getPosition().x - 1, player.getPosition().y + 1),
        player.map
      );
    } else if (input.isKeyDown(input.keys.NUM3)) {
      player.endTurn = player.move(
        new Point(player.getPosition().x + 1, player.getPosition().y + 1),
        player.map
      );
    }
  }
}
