import Gameboard from "./gameboard";
export default class Player {
  constructor(cpu, name) {
    this.cpu = cpu;
    this.name =
      cpu === true
        ? "CPU"
        : name.length > 10 || name === ""
        ? (() => {
            throw new Error("The name of the player is too long");
          })()
        : name;
    this.gameBoard = new Gameboard();
  }
}
