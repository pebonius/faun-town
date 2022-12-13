import Point from "../geometry/point.js";
import Tile from "./tile.js";

describe("Tile tests", () => {
  test("Tile initializes with proper type", () => {
    expect(() => {
      new Tile("floor");
    }).not.toThrow();
  });

  test("Tile.isWalkable returns true for a walkable tile", () => {
    const tile = new Tile("floor");
    expect(tile.isWalkable).toBe(true);
  });

  test("Tile.isWalkable returns false for a non-walkable tile", () => {
    const tile = new Tile("wall");
    expect(tile.isWalkable).toBe(false);
  });

  test("Tile.type can only be set to existing tile type", () => {
    const illegalValues = ["non-existent type", -2, 1.23, {}];

    for (let value in illegalValues) {
      expect(() => {
        new Tile(value);
      }).toThrow();
    }
  });
});
