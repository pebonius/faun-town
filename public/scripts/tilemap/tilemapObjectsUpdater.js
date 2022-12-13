import { checkForArray, isDefined } from "../utilities/utilities.js";

export default class TilemapObjectsUpdater {
  constructor(tilemap) {
    this.tilemap = tilemap;
  }
  get tilemap() {
    return this._tilemap;
  }
  set tilemap(value) {
    if (!isDefined(value)) {
      throw new Error("tilemap has to be defined");
    }
    this._tilemap = value;
  }
  update() {
    const toTurn = new Array();
    this.turnObjects(toTurn);
  }
  turnObjects(toTurn) {
    this.gatherObjectsToTurn(toTurn);
    checkForArray(toTurn, "toTurn");

    for (let i = 0; i < toTurn.length; i++) {
      if (typeof toTurn[i].onTurn === "function") {
        toTurn[i].onTurn();
      }
    }
  }
  gatherObjectsToTurn(toTurn) {
    checkForArray(toTurn, "toTurn");

    this.tilemap.performOnTiles(this.tilemap.bounds, (pos) => {
      const creature = this.tilemap.creatures.get(pos);
      if (
        creature != null &&
        creature.isDead === false &&
        !toTurn.includes(creature)
      ) {
        toTurn.push(creature);
      }
    });
  }
}
