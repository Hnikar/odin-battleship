import Ship from "./ship";
export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.missedAttacks = [];
  }
  placeShip(ship, [X, Y], orientation) {
    if (orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.board[X + i][Y] = 1;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[X][Y + i] = 1;
      }
    }
  }
  receiveAttack([X, Y]) {
    if (this.board[X][Y] === 1) {
      this.board[X][Y] = 3;
      return true;
    } else if (this.board[X][Y] === 0) {
      this.board[X][Y] = 2;
      this.missedAttacks.push([X, Y]);
      return false;
    }
  }
  areAllShipsSunk() {
    return this.board.every((row) => row.every((cell) => cell !== 1));
  }
}

//0-empty
//1-ship
//2-missed
//3-hit
