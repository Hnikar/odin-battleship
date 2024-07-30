export default class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
    this.missedAttacks = [];
  }
  recieveAttack(coordinateX, coordinateY) {}
  placeShip(ship, coordinateX, coordinateY) {}
}
