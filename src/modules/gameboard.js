import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.missedAttacks = [];
    this.ships = [];
  }

  isValidPlacement(ship, [X, Y], orientation) {
    const shipLength = ship.length;

    for (let i = 0; i < shipLength; i++) {
      let x = X,
        y = Y;

      if (orientation === "horizontal") {
        x = X + i;
      } else {
        y = Y + i;
      }

      // Check if the ship goes out of bounds
      if (x >= 10 || y >= 10) {
        return false;
      }

      // Check the surrounding cells for any other ships
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            if (this.board[nx][ny] === 1) {
              return false;
            }
          }
        }
      }
    }

    return true;
  }

  placeShip(ship, [X, Y], orientation) {
    if (!this.isValidPlacement(ship, [X, Y], orientation)) {
      throw new Error(
        "Invalid placement: ships cannot be placed near each other or out of bounds."
      );
    }

    const shipCoordinates = [];

    if (orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.board[X + i][Y] = 1;
        shipCoordinates.push([X + i, Y]);
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[X][Y + i] = 1;
        shipCoordinates.push([X, Y + i]);
      }
    }

    // Store the ship with its coordinates and its current hit status
    this.ships.push({ ship, coordinates: shipCoordinates, hits: 0 });
  }

  receiveAttack([X, Y]) {
    if (this.board[X][Y] === 1) {
      this.board[X][Y] = 3; // Mark as hit

      // Find which ship was hit
      const ship = this.ships.find((ship) =>
        ship.coordinates.some((coord) => coord[0] === X && coord[1] === Y)
      );

      ship.hits += 1;

      // Check if the ship is completely destroyed
      if (ship.hits === ship.ship.length) {
        this.markSurroundingCells(ship.coordinates);
      }

      return true;
    } else if (this.board[X][Y] === 0) {
      this.board[X][Y] = 2; // Mark as missed
      this.missedAttacks.push([X, Y]);
      return false;
    }
  }

  markSurroundingCells(coordinates) {
    coordinates.forEach(([X, Y]) => {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = X + dx;
          const ny = Y + dy;

          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            if (this.board[nx][ny] === 0) {
              this.board[nx][ny] = 2; // Mark as missed
              this.missedAttacks.push([nx, ny]);
            }
          }
        }
      }
    });
  }

  areAllShipsSunk() {
    return this.board.every((row) => row.every((cell) => cell !== 1));
  }
}
