import Player from "../gameObjects/player.js";
import Tilemap from "../gameObjects/tilemap.js";
import Point from "../geometry/point.js";
import GameState from "./gameState.js";

export default class GameScreen extends GameState {
  constructor(gameStates, canvas, input, content, sound) {
    super(gameStates);
    this.canvas = canvas;
    this.input = input;
    this.content = content;
    this.sound = sound;
    this.map = new Tilemap(this, this.content.map);
    this.player = new Player(this, this.map, new Point(2, 2));
  }
  update(input) {}
  draw(context, canvas) {
    this.map.draw(context);
  }
}
