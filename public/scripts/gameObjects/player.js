export default class Player {
  constructor(gameScreen, startingMap, startingPosition) {
    this.gameScreen = gameScreen;
    this.position = startingPosition;
    this.sprite = this.gameScreen.content.pc;
    this.map = startingMap;
    this.map.addEntity(this);
  }
  toString() {
    return "player";
  }
}
