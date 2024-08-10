import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

describe("Gameboard", () => {
  test("Gameboard should have a board array", () => {
    let gameboard = new Gameboard();
    expect(gameboard.board).toBeDefined();
  });
  test("Gameboard should be able to place a ship", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    expect(gameboard.board[0][0]).toBe(1);
  });

  test("Gameboard should be able to check invalid placement out of bounds", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    expect(() => gameboard.placeShip(ship, [0, 100], "horizontal")).toThrow(
      "Invalid placement: ships cannot be placed near each other or out of bounds."
    );
  });

  test("Gameboard should be able to check invalid placement near other ships", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    expect(() => gameboard.placeShip(ship, [0, 1], "horizontal")).toThrow(
      "Invalid placement: ships cannot be placed near each other or out of bounds."
    );
  });
  test("Gameboard should be able to check invalid placement overlapping other ships", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    expect(() => gameboard.placeShip(ship, [1, 0], "horizontal")).toThrow(
      "Invalid placement: ships cannot be placed near each other or out of bounds."
    );
  });
  test("Gameboard should be able to receive an attack", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.board[0][0]).toBe(3);
  });
  test("Gameboard should be able to keep track of missed attacks", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 1]);
    expect(gameboard.missedAttacks).toContainEqual([1, 1]);
  });
  test("Gameboard should be able to check if all ships are sunk", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 0]);
    expect(gameboard.areAllShipsSunk()).toBe(true);
  });

  // New tests for the added functionality

  test("Gameboard should destroy the ship and mark surrounding cells as missed when all parts of the ship are hit", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(2);
    gameboard.placeShip(ship, [2, 2], "horizontal");

    gameboard.receiveAttack([2, 2]);
    gameboard.receiveAttack([3, 2]);

    expect(gameboard.board[2][2]).toBe(3);
    expect(gameboard.board[3][2]).toBe(3);

    // Check surrounding cells are marked as missed (2)
    expect(gameboard.board[1][1]).toBe(2);
    expect(gameboard.board[1][2]).toBe(2);
    expect(gameboard.board[1][3]).toBe(2);
    expect(gameboard.board[2][1]).toBe(2);
    expect(gameboard.board[2][3]).toBe(2);
    expect(gameboard.board[3][1]).toBe(2);
    expect(gameboard.board[3][3]).toBe(2);
    expect(gameboard.board[4][1]).toBe(2);
    expect(gameboard.board[4][2]).toBe(2);
    expect(gameboard.board[4][3]).toBe(2);
  });

  test("Gameboard should correctly handle vertical ships and mark surrounding cells as missed when destroyed", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(3);
    gameboard.placeShip(ship, [5, 5], "vertical");

    gameboard.receiveAttack([5, 5]);
    gameboard.receiveAttack([5, 6]);
    gameboard.receiveAttack([5, 7]);

    expect(gameboard.board[5][5]).toBe(3);
    expect(gameboard.board[5][6]).toBe(3);
    expect(gameboard.board[5][7]).toBe(3);

    // Check surrounding cells are marked as missed (2)
    expect(gameboard.board[4][4]).toBe(2);
    expect(gameboard.board[4][5]).toBe(2);
    expect(gameboard.board[4][6]).toBe(2);
    expect(gameboard.board[4][7]).toBe(2);
    expect(gameboard.board[4][8]).toBe(2);
    expect(gameboard.board[5][4]).toBe(2);
    expect(gameboard.board[5][8]).toBe(2);
    expect(gameboard.board[6][4]).toBe(2);
    expect(gameboard.board[6][5]).toBe(2);
    expect(gameboard.board[6][6]).toBe(2);
    expect(gameboard.board[6][7]).toBe(2);
    expect(gameboard.board[6][8]).toBe(2);
  });

  test("Gameboard should not mark surrounding cells as missed when the ship is not fully destroyed", () => {
    let gameboard = new Gameboard();
    let ship = new Ship(3);
    gameboard.placeShip(ship, [5, 5], "vertical");

    gameboard.receiveAttack([5, 5]);
    gameboard.receiveAttack([5, 6]);

    // Ship is not fully destroyed yet, so surrounding cells should not be marked
    expect(gameboard.board[4][4]).toBe(0);
    expect(gameboard.board[6][7]).toBe(0);
  });
});
