export default class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(false));
    this.ships = [];
    this.missedAttacks = [];
  }

  recieveAttack(coordinateX, coordinateY) {}
  placeShip(ship, coordinateX, coordinateY) {}
}
