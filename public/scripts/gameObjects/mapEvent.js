import Point from "../geometry/point.js";
import Debug from "../utilities/debug.js";
import {
  isDefined,
  isFunction,
  isNonEmptyString,
} from "../utilities/utilities.js";
import Entity from "./entity.js";

export default class MapEvent extends Entity {
  constructor(gameScreen, map, data) {
    super(gameScreen);
    this.load(map, data);
  }
  onCollision(collider) {
    super.onCollision(collider);

    if (this.conditionFulfilled()) {
      this.playActions(collider);
    } else {
      this.letThrough(collider);
    }
  }
  playActions(collider) {
    if (Array.isArray(this.actions) && this.actions.length > 0) {
      this.actions.forEach((action) => {
        const supportedAction = this.getSupportedAction(action.name);
        supportedAction(...action.arguments);
      });
    }
  }
  letThrough(collider) {
    collider.placeOnMap(this.position, this.map);
  }
  conditionFulfilled() {
    const supportedCondition = this.getSupportedCondition(this.condition);

    if (!isDefined(this.condition) || !isDefined(this.conditionArgs)) {
      return true;
    }

    return (
      isFunction(supportedCondition) &&
      supportedCondition(...this.conditionArgs)
    );
  }
  getSupportedAction(action) {
    switch (action) {
      case "log":
        return (string) => {
          Debug.log(string);
        };
      case "setVariableValue":
        return (name, value) => {
          this.gameScreen.variables.setVariableValue(name, value);
        };
      case "changeVariableValue":
        return (name, change) => {
          this.gameScreen.variables.changeVariableValue(name, change);
        };
      case "movePlayer":
        return (posX, posY, mapId) => {
          const pos = new Point(posX, posY);
          const map = this.gameScreen.maps.getMapById(mapId);
          this.gameScreen.player.placeOnMap(pos, map);
        };
      case "playDialogue":
        return (messages) => {
          this.gameScreen.ui.playDialogue(messages);
        };
      case "playMusic":
        return (trackName, looped) => {
          const track = this.gameScreen.content.getAssetByName(trackName);
          this.gameScreen.sound.playMusic(track, looped);
        };
      case "endGame":
        return () => {
          this.gameScreen.endGame();
        };
      case "":
        return () => {};
      default:
        return () => {
          Debug.log(
            `<<${this}>> tried to call unsupported action <<${action}>>.`
          );
        };
    }
  }
  getSupportedCondition(condition) {
    switch (condition) {
      case "variableValueIs":
        return (variableName, value) => {
          return this.gameScreen.variables.variableValueIs(variableName, value);
        };
      case "variableValueIsNot":
        return (variableName, value) => {
          return this.gameScreen.variables.variableValueIsNot(
            variableName,
            value
          );
        };
      case "variableValueIsAtLeast":
        return (variableName, value) => {
          return this.gameScreen.variables.variableValueIsAtLeast(
            variableName,
            value
          );
        };
      case "variableValueIsNoMoreThan":
        return (variableName, value) => {
          return this.gameScreen.variables.variableValueIsNoMoreThan(
            variableName,
            value
          );
        };
      case "":
        return () => {
          return true;
        };
      default:
        return () => {
          Debug.log(
            `<<${this}>> tried to call unsupported condition <<${condition}>>.`
          );
        };
    }
  }
  load(map, data) {
    this.name = data.name;
    const position = new Point(data.posX, data.posY);
    this.placeOnMap(position, map);

    if (isNonEmptyString(data.sprite)) {
      this.sprite = this.gameScreen.content.getAssetByName(data.sprite);
    } else {
      this.sprite = null;
    }
    this.condition = data.condition;
    this.conditionArgs = data.conditionArgs;
    this.actions = data.actions;
  }
}
