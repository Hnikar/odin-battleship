import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Ship from "./ship.js";
import dom from "./dom.js";

const game = (() => {
  let player, cpu, currentPlayer;

  function gameInit() {
    player = new Player(false, "Player");
    cpu = new Player(true);
    player.gameBoard = new Gameboard();
    cpu.gameBoard = new Gameboard();
    _placeShipsRandomly(cpu);
    dom.renderBoard(player.gameBoard.board, "player");
    dom.updateMessage("Drag and drop your ships onto the board!");
    dom.enableElement("reroll", true);
    dom.enableElement("play", false);
    dom.enableElement("reset", true);
    dom.resetShips();
    dom.enableBoardInteraction(false);
    dom.setupDragAndDrop(player, Ship);
  }

  function _placeShipsRandomly(player) {
    player.gameBoard = new Gameboard();
    const ships = [
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
      new Ship(2),
      new Ship(1),
    ];
    ships.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        try {
          player.gameBoard.placeShip(ship, [x, y], orientation);
          placed = true;
        } catch (e) {}
      }
    });
    dom.enableElement("play", true);
  }

  function _startGame() {
    dom.renderBoard(player.gameBoard.board, "player");
    dom.renderBoard(cpu.gameBoard.board, "cpu", true);
    dom.updateMessage("Click on the CPU board to attack!");
    currentPlayer = player;
    dom.hideButtons();
    dom.enableBoardInteraction(true);
    dom.secureAddEventListener("cpuBoard", _handleAttack);
  }

  function _handleAttack(e) {
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    if (cpu.gameBoard.board[x][y] === 2 || cpu.gameBoard.board[x][y] === 3) {
      dom.updateMessage("You already attacked this spot! Choose another.");
      return;
    }
    if (cpu.gameBoard.receiveAttack([x, y])) {
      dom.updateMessage("Hit! Attack again.");
      dom.renderBoard(cpu.gameBoard.board, "cpu", true);
      if (cpu.gameBoard.areAllShipsSunk()) {
        _endGame(player);
        return;
      }
    } else {
      dom.updateMessage("Miss! CPU's turn.");
      dom.renderBoard(cpu.gameBoard.board, "cpu", true);
      _switchTurns();
    }
  }

  function _switchTurns() {
    dom.enableBoardInteraction(false);
    setTimeout(_cpuAttack, 1000);
  }

  function _cpuAttack() {
    let x,
      y,
      validAttack = false;
    while (!validAttack) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      if (
        player.gameBoard.board[x][y] === 0 ||
        player.gameBoard.board[x][y] === 1
      ) {
        validAttack = true;
      }
    }
    const hit = player.gameBoard.receiveAttack([x, y]);
    dom.renderBoard(player.gameBoard.board, "player");
    if (hit) {
      dom.updateMessage("CPU hit! CPU attacks again.");
      if (player.gameBoard.areAllShipsSunk()) {
        _endGame(cpu);
        return;
      }
      setTimeout(_cpuAttack, 1000);
    } else {
      dom.updateMessage("CPU missed! Your turn.");
      dom.enableBoardInteraction(true);
    }
  }

  function _endGame(winner) {
    dom.updateMessage(`${winner.name} wins!`);
    dom.enableBoardInteraction(false);
  }

  function btnInit() {
    dom.secureAddEventListener("play", _startGame);
    dom.secureAddEventListener("reset", gameInit);
    dom.secureAddEventListener("reroll", () => {
      _placeShipsRandomly(player);
      dom.renderBoard(player.gameBoard.board, "player");
    });
  }

  return { gameInit, btnInit };
})();

export default game;