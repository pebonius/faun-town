import GameState from "./gameState.js";
import Point from "../geometry/point.js";
import Label from "../ui/label.js";
import WelcomeScreen from "./welcomeScreen.js";

export default class LoadingScreen extends GameState {
  constructor(gameStates, canvas, input, content, sound) {
    super(gameStates);
    this.canvas = canvas;
    this.input = input;
    this.content = content;
    this.sound = sound;
    this.addLoadingLabel();
    this.loadContent();
  }
  loadContent() {
    this.content.onFinishedLoading = () => {
      this.showWelcomeScreen();
    };
    this.content.loadContent();
  }
  addLoadingLabel() {
    this.loadingLabel = new Label(
      "loading...",
      new Point(this.canvas.width / 3, (this.canvas.height / 4) * 3),
      26,
      "white",
      "blue"
    );
  }
  showWelcomeScreen() {
    this.gameStates.push(
      new WelcomeScreen(
        this.gameStates,
        this.canvas,
        this.input,
        this.content,
        this.sound
      )
    );
    this.kill();
  }
  draw(context, canvas) {
    super.draw(context, canvas);
    this.loadingLabel.draw(context);
  }
}
