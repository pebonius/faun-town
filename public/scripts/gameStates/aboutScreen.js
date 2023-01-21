import GameState from "./gameState.js";
import Point from "../geometry/point.js";
import Label from "../ui/label.js";
import { drawImage } from "../utilities/graphics.js";

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
    this.bgImage = this.content.getAssetByName(
      this.content.data.meta.menuBackground
    );
    this.bgPos = new Point(0, 0);
    this.bgSize = new Point(640, 480);
  }
  addAboutText() {
    this.textLabel = new Label(
      this.content.data.meta.about,
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
    drawImage(context, this.bgImage, this.bgPos, this.bgSize);
    this.textLabel.draw(context);
    this.drawControlLabels(context);
  }
  drawControlLabels(context) {
    this.controlLabels.forEach((e) => e.draw(context));
  }
}
