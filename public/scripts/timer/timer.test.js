import Timer from "./timer.js";

describe("Timer tests", () => {
  test("Timer initializes", () => {
    expect(() => {
      new Timer(3, () => {});
    }).not.toThrow();
  });
  test("Timer performs onTick action", () => {
    let testNumber = 0;
    const testValue = 123;

    expect(testNumber).not.toBe(testValue);

    const timer = new Timer(1, () => {
      testNumber = testValue;
    });

    timer.update();

    expect(testNumber).toBe(testValue);
  });
});
