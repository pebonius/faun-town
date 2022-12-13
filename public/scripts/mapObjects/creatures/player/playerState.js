export default class PlayerState {
  constructor(name, char, lasts) {
    this.name = name;
    this.char = char;
    this.lasts = lasts;
    this.turnsRemaining = lasts;
    this.isDead = false;
  }
  onTurn() {
    if (this.turnsRemaining <= 0) {
      this.kill();
    }
  }
  kill() {
    this.isDead = true;
  }
}
