export default class Timer {
  constructor(tickDelay, onTick) {
    this.time = 0;
    this.tickDelay = tickDelay;
    this.onTick = onTick;
  }
  update(input) {
    this.time++;

    if (this.time >= this.tickDelay) {
      this.onTick();
      this.reset();
    }
  }
  reset() {
    this.time = 0;
  }
}
