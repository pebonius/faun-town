import Readable from "./readable.js";

export default class Note extends Readable {
  constructor(gameScreen, position, map, text) {
    super(gameScreen, position, map, text);
    this.name = "note";
    this.char = "📄";
    this.text = text;
  }
}
