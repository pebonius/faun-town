import { tryToPlaceWithinBounds } from "../procGen/procGenUtilities.js";
import Point from "../geometry/point.js";
import ToiletBowl from "../mapObjects/creatures/toiletBowl.js";
import ToiletPaper from "../mapObjects/items/toiletPaper.js";
import Chair from "../mapObjects/creatures/chair.js";
import Cooker from "../mapObjects/creatures/cooker.js";

export default class Interiors {
  constructor() {}
  // TOILET
  addToilet(bounds, tilemap) {
    tryToPlaceWithinBounds(
      bounds,
      tilemap,
      this.conditionsForPlacingToiletBowl,
      this.createToiletBowl
    );

    tryToPlaceWithinBounds(
      bounds,
      tilemap,
      this.conditionsForPlacingToiletPaper,
      this.createToiletPaper,
      2
    );
  }
  conditionsForPlacingToiletBowl(bounds, pos, tilemap) {
    return (
      tilemap.canPlaceCreature(pos) &&
      tilemap.tiles.get(new Point(pos.x + 1, pos.y)).type == tilemap.wallType &&
      tilemap.numberOfTypeNeighbors(pos, 1, tilemap.wallType) != 4 &&
      !bounds.sidesContain(pos)
    );
  }
  conditionsForPlacingToiletPaper(bounds, pos, tilemap) {
    return (
      tilemap.canPlaceItem(pos) &&
      tilemap.canPlaceCreature(pos) &&
      !bounds.sidesContain(pos)
    );
  }
  conditionsForPlacingObstacles(bounds, pos, tilemap) {
    return (
      tilemap.canPlaceCreature(pos) &&
      tilemap.numberOfTypeNeighbors(pos, 1, tilemap.wallType) == 0 &&
      !bounds.sidesContain(pos)
    );
  }
  createToiletPaper(pos, tilemap) {
    return new ToiletPaper(tilemap.gameScreen, pos, tilemap);
  }
  createToiletBowl(pos, tilemap) {
    return new ToiletBowl(tilemap.gameScreen, pos, tilemap);
  }
  // KITCHEN
  addKitchen(bounds, tilemap) {
    tryToPlaceWithinBounds(
      bounds,
      tilemap,
      this.conditionsForPlacingObstacles,
      this.createChair
    );

    tryToPlaceWithinBounds(
      bounds,
      tilemap,
      this.conditionsForPlacingObstacles,
      this.createCooker
    );
  }
  createChair(pos, tilemap) {
    return new Chair(tilemap.gameScreen, pos, tilemap);
  }
  createCooker(pos, tilemap) {
    return new Cooker(tilemap.gameScreen, pos, tilemap);
  }
}
