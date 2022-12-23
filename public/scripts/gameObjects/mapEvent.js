import Point from "../geometry/point.js";
import Debug from "../utilities/debug.js";
import { isNonEmptyString } from "../utilities/utilities.js";
import Entity from "./entity.js";

export default class MapEvent extends Entity {
  constructor(gameScreen, map, data) {
    super(gameScreen);
    this.load(map, data);
  }
  onCollision(collider) {
    super.onCollision(collider);
    this.playActions();
  }
  playActions() {
    if (Array.isArray(this.sequences) && this.sequences.length > 0) {
      this.sequences.forEach((sequence) => {
        const condition = this.getSupportedCondition(sequence.condition);
        const conditionArgs = sequence.conditionArgs;

        if (this.conditionFulfilled(condition, conditionArgs)) {
          sequence.actions.forEach((action) => {
            const supportedAction =
              this.game.supportedActions.getSupportedAction(action.name);
            supportedAction(...action.arguments);
          });
        }
      });
    }
  }
  conditionFulfilled(condition, conditionArgs) {
    return (
      condition != undefined &&
      conditionArgs != undefined &&
      condition(...conditionArgs)
    );
  }
  getSupportedAction(action) {
    switch (action) {
      // case "restart":
      //   return () => {
      //     this.game.scenario.runScenario();
      //   };
      // case "nextScene":
      //   return () => {
      //     this.game.scenario.goToNextScene();
      //   };
      // case "goToScene":
      //   return (id) => {
      //     this.game.scenario.goToScene(id);
      //   };
      // case "addTopHud":
      //   return (label, value) => {
      //     this.game.scenario.addTopHudItem(label, value);
      //   };
      // case "setVariableValue":
      //   return (name, value) => {
      //     this.game.scenario.setVariableValue(name, value);
      //   };
      // case "changeVariableValue":
      //   return (name, change) => {
      //     this.game.scenario.changeVariableValue(name, change);
      //   };
      case "":
        return () => {};
      default:
        return () => {
          Debug.log(`tried to call unsupported action <<${action}>>.`);
        };
    }
  }
  getSupportedCondition(condition) {
    switch (condition) {
      // case "variableValueIs":
      //   return (variableName, value) => {
      //     return this.game.scenario.variableValueIs(variableName, value);
      //   };
      // case "variableValueIsNot":
      //   return (variableName, value) => {
      //     return this.game.scenario.variableValueIsNot(variableName, value);
      //   };
      // case "variableValueIsAtLeast":
      //   return (variableName, value) => {
      //     return this.game.scenario.variableValueIsAtLeast(variableName, value);
      //   };
      // case "variableValueIsNoMoreThan":
      //   return (variableName, value) => {
      //     return this.game.scenario.variableValueIsNoMoreThan(
      //       variableName,
      //       value
      //     );
      //   };
      case "":
        return () => {
          return true;
        };
      default:
        return () => {
          Debug.log(`tried to call unsupported condition <<${condition}>>.`);
        };
    }
  }
  load(map, data) {
    this.name = data.name;
    const position = new Point(data.posX, data.posY);
    this.placeOnMap(position, map);

    if (isNonEmptyString(data.sprite)) {
      this.sprite = data.sprite;
    } else {
      this.sprite = this.gameScreen.content.pc;
    }

    this.sequences = data.sequences;
  }
}
