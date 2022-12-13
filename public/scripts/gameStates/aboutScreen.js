import GameState from "./gameState.js";
import Point from "../geometry/point.js";
import Sprite from "../drawableComponents/sprite.js";
import Label from "../ui/label.js";

export default class AboutScreen extends GameState {
  constructor(gameStates, canvas, input, content, sound) {
    super(gameStates);
    this.canvas = canvas;
    this.input = input;
    this.content = content;
    this.sound = sound;
    this.controlLabels = [];
    this.firstLabelPosition = new Point(
      this.canvas.width / 4,
      (this.canvas.height / 7) * 5
    );
    this.addBackgroundImage();
    this.addAboutText();
    this.addControlLabel("B", "back to menu");
  }
  addBackgroundImage() {
    this.bgImage = new Sprite(
      this.content.pcPortrait,
      new Point(0, 0),
      new Point(640, 480)
    );
  }
  addAboutText() {
    this.textLabel = new Label(
      "a game by peb.",
      new Point(this.canvas.width / 5, (this.canvas.height / 9) * 1),
      26,
      "yellow",
      "seagreen"
    );
  }
  addControlLabel(keyname, functionName) {
    const labelText = keyname.toUpperCase() + " - " + functionName;
    this.controlLabels.push(
      new Label(
        labelText,
        new Point(
          this.firstLabelPosition.x,
          this.firstLabelPosition.y + 30 * this.controlLabels.length
        ),
        26,
        "yellow",
        "seagreen"
      )
    );
  }
  goBack() {
    this.kill();
  }
  update(input) {
    if (input.isKeyPressed(input.keys.B)) {
      this.goBack();
    }
  }
  draw(context, canvas) {
    super.draw(context, canvas);
    this.bgImage.draw(context);
    this.textLabel.draw(context);
    this.drawControlLabels(context);
  }
  drawControlLabels(context) {
    this.controlLabels.forEach((e) => e.draw(context));
  }
}
