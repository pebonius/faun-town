import ChamberTree from "./chamberTree.js";
import Point from "../geometry/point.js";
import Rectangle from "../geometry/rectangle.js";

const position = new Point(0, 0);
const size = new Point(10, 10);
const bounds = new Rectangle(position, size);
const chambers = 3;
const chamberSize = new Point(3, 3);

const testChamberTree = () => {
  return new ChamberTree(
    bounds,
    chambers,
    chambers,
    chamberSize,
    chamberSize,
    []
  );
};

describe("ChamberTree tests", () => {
  test("ChamberTree initializes", () => {
    try {
      testChamberTree();
    } catch (error) {
      throw new Error(error);
    }
  });
  test("ChamberTree randomChamberSize returns a chamber size", () => {
    const chamberTree = testChamberTree();

    expect(chamberTree.randomChamberSize.x).toBe(chamberSize.x);
    expect(chamberTree.randomChamberSize.y).toBe(chamberSize.y);
  });
});
