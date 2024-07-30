import Gameboard from "./gameboard";
export default class Player {
  constructor(name, cpu) {
    this.cpu = cpu;
    this.name = cpu === true ? "CPU" : name;
    this.gameBoard = new Gameboard();
  }
}
