import { isNonEmptyString } from "../../../utilities/utilities.js";
import Item from "../item.js";

export default class Readable extends Item {
  constructor(gameScreen, position, map, text) {
    super(gameScreen, position, map);
    this.name = "readable";
    this.char = "📜";
    this.text = text;
  }
  get text() {
    return this._text;
  }
  set text(value) {
    if (isNonEmptyString(value)) {
      this._text = value;
    } else {
      throw new RangeError("Provided text must be a non-empty string.");
    }
  }
  interactGround(user) {
    this.use(user);
  }
  use(user) {
    this.read(user);
  }
  read(user) {
    this.logMessage(
      user.name.toUpperCase() + " reads " + this.name.toUpperCase() + "."
    );
    this.logText();
  }
  logText() {
    const str = this.name.toUpperCase() + " says <<" + this.text + ">>";
    this.logMessage(str);
  }
}
