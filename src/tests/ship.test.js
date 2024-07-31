import Ship from "../modules/ship";

describe("Ship", () => {
  test("throws error if length is less than 1", () => {
    expect(() => new Ship(0)).toThrow("Invalid ship length");
  });

  test("throws error if length is greater than 4", () => {
    expect(() => new Ship(5)).toThrow("Invalid ship length");
  });

  test("creates a ship with valid length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.hitCount).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

  test("hit increases hitCount", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hitCount).toBe(1);
  });

  test("isSunk returns true if hitCount equals length", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy;
  });

  test("isSunk returns false if hitCount is less than length", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBeFalsy;
  });

  test("hit sets isSunk to true if hitCount equals length", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy;
  });
});
