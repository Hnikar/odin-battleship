import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

describe("Gameboard", () => {
  test("Gameboard should have a board array", () => {
    let gameboard = new Gameboard();
    expect(gameboard.board).toBeDefined();
  });
  // place ship
  test("Gameboard should be able to place a ship", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    expect(gameboard.board[0][0]).toBe(1);
  });
  // recieve attack
  test("Gameboard should be able to receive an attack", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.board[0][0]).toBe(3);
  });
  // keep track of missed attacks
  test("Gameboard should be able to keep track of missed attacks", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 1]);
    expect(gameboard.missedAttacks).toContainEqual([1, 1]);
  });
  //are all the ships sunk
  test("Gameboard should be able to check if all ships are sunk", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 0]);
    expect(gameboard.areAllShipsSunk()).toBe(true);
  });
});
