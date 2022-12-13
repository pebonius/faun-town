import Point from "../geometry/point.js";

export default class FieldOfView {
  constructor() {
    this.baseRangeOfView = 3;
  }
  setInitialVisibility(tilemap) {
    tilemap.performOnTiles(tilemap.bounds, (pos) => {
      tilemap.visibility.set(pos, false);
    });
  }
  updateVisibility(tilemap, player) {
    const rangeOfView = this.rangeOfView(tilemap, player);

    tilemap.performOnTilesInViewport((pos) => {
      this.setVisibilityForPosition(pos, tilemap, player, rangeOfView);
    });
  }
  setVisibilityForPosition(position, tilemap, player, rangeOfView) {
    if (this.isVisible(position, tilemap, player, rangeOfView)) {
      tilemap.visibility.set(position, true);
    } else {
      tilemap.visibility.set(position, false);
    }
  }
  isVisible(position, tilemap, player, rangeOfView) {
    return Point.distance(position, player.position) <= rangeOfView;
  }
  rangeOfView(tilemap, player) {
    return this.baseRangeOfView + tilemap.lightLevel;
  }
}
