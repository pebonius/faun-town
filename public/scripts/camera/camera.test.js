import Camera from "./camera.js";

describe("Camera tests", () => {
  test("Camera initializes", () => {
    try {
      new Camera(1, 2);
    } catch (error) {
      throw new Error(error);
    }
  });

  test("Camera returns correct viewport width and height", () => {
    const testViewportWidth = 10;
    const testViewportHeight = 20;
    const camera = new Camera(testViewportWidth, testViewportHeight);

    expect(camera.viewportSize.x).toBe(testViewportWidth);
    expect(camera.viewportSize.y).toBe(testViewportHeight);
  });
});
