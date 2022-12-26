import Player from "../gameObjects/player.js";
import Tilemap from "../gameObjects/tilemap.js";
import Variables from "../gameObjects/variables.js";
import GameState from "./gameState.js";

export default class GameScreen extends GameState {
  constructor(gameStates, canvas, input, content, sound) {
    super(gameStates);
    this.canvas = canvas;
    this.input = input;
    this.content = content;
    this.sound = sound;
    this.load();
  }
  update(input) {
    this.player.update(input);
  }
  draw(context, canvas) {
    this.player.map.draw(context);
  }
  getMapById(mapId) {
    return this.maps[mapId];
  }
  load() {
    this.loadMaps();
    this.loadPlayer();
    this.loadVariables();
  }
  loadPlayer() {
    this.player = new Player(this, this.content.data.playerData);
  }
  loadVariables() {
    this.variables = new Variables(this, this.content.data.variables);
  }
  loadMaps() {
    this.maps = [];
    this.content.data.maps.forEach((element) => {
      this.maps.push(new Tilemap(this, element));
    });
  }
}
