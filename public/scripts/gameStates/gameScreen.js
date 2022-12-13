import GameState from "./gameState.js";

export default class GameScreen extends GameState {
  constructor(gameStates, canvas, input, content, sound) {
    super(gameStates);
    this.canvas = canvas;
    this.input = input;
    this.content = content;
    this.sound = sound;
  }
  update(input) {}
  draw(context, canvas) {}
}
