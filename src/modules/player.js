import Gameboard from "./gameboard";
export default class Player {
  constructor(cpu, name) {
    this.cpu = cpu;
    if (cpu === true) {
      this.name = "CPU";
    } else {
      if (name.length > 10 || name === "") {
        throw new Error("Invalid player name");
      } else {
        this.name = name;
      }
    }
  
    this.gameBoard = new Gameboard();
  }
}
