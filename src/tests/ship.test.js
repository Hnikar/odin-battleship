import Ship from "../modules/ship";
it("Should initialize with given length and hitCount set to 0", () => {
  const length = 5;
  const ship = new Ship(length);
  expect(ship.length).toBe(length);
  expect(ship.hitCount).toBe(0);
});
