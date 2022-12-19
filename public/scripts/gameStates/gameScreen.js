import Player from "../gameObjects/player.js";
import Tilemap from "../gameObjects/tilemap.js";
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
  }
  loadPlayer() {
    this.player = new Player(this, this.content.data.playerData);
  }
  loadMaps() {
    this.maps = [];
    this.content.data.maps.forEach((element) => {
      this.maps.push(new Tilemap(this, element));
    });
  }
}
