import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";
import dom from "./dom";

const game = (() => {
  let player, cpu, currentPlayer;

  const init = () => {
    player = new Player(false, "Player");
    cpu = new Player(true);
    placeShipsRandomly(player);
    placeShipsRandomly(cpu);

    dom.renderBoard(player.gameBoard.board, dom.playerBoardElement);
    dom.renderBoard(cpu.gameBoard.board, dom.cpuBoardElement, true);
    dom.updateMessage("Click on the CPU board to attack!");

    currentPlayer = player;
    dom.enableBoardInteraction(true);

    dom.cpuBoardElement.addEventListener("click", handleAttack);
  };

  const placeShipsRandomly = (player) => {
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
  };

  const handleAttack = (e) => {
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);

    if (cpu.gameBoard.board[x][y] === 2 || cpu.gameBoard.board[x][y] === 3) {
      dom.updateMessage("You already attacked this spot! Choose another.");
      return;
    }

    if (cpu.gameBoard.receiveAttack([x, y])) {
      dom.updateMessage("Hit! Attack again.");
      dom.renderBoard(cpu.gameBoard.board, dom.cpuBoardElement, true);
      if (cpu.gameBoard.areAllShipsSunk()) {
        endGame(player);
        return;
      }
    } else {
      dom.updateMessage("Miss! CPU's turn.");
      dom.renderBoard(cpu.gameBoard.board, dom.cpuBoardElement, true);
      switchTurns();
    }
  };

  const switchTurns = () => {
    dom.enableBoardInteraction(false);
    setTimeout(cpuAttack, 1000);
  };

  const cpuAttack = () => {
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
    dom.renderBoard(player.gameBoard.board, dom.playerBoardElement);
    if (hit) {
      dom.updateMessage("CPU hit! CPU attacks again.");
      if (player.gameBoard.areAllShipsSunk()) {
        endGame(cpu);
        return;
      }
      setTimeout(cpuAttack, 1000);
    } else {
      dom.updateMessage("CPU missed! Your turn.");
      dom.enableBoardInteraction(true);
    }
  };

  const endGame = (winner) => {
    dom.updateMessage(`${winner.name} wins!`);
    dom.enableBoardInteraction(false);
  };

  const resetGame = () => {
    dom.playButton.addEventListener("click", init);
    dom.rerollButton.addEventListener("click", () => {
      player.gameBoard = new Gameboard();
      placeShipsRandomly(player);
      dom.renderBoard(player.gameBoard.board, dom.playerBoardElement);
    });
  };

  return { init, resetGame };
})();

export default game;
