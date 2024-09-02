import Gameboard from "./gameboard.js";
import Player from "./player.js";
import Ship from "./ship.js";
import dom from "./dom.js";

const game = (() => {
  let player, cpu, currentPlayer;
  let draggedShip = null;
  let isHorizontal = true;

  const init = () => {
    player = new Player(false, "Player");
    cpu = new Player(true);
    player.gameBoard = new Gameboard();
    cpu.gameBoard = new Gameboard();
    placeShipsRandomly(cpu);
    dom.renderBoard(player.gameBoard.board, dom.playerBoardElement);
    dom.updateMessage("Drag and drop your ships onto the board!");
    dom.enableRerollButton(true);
    dom.enablePlayButton(false);
    dom.enableBoardInteraction(false);
    setupDragAndDrop();
  };

  const setupDragAndDrop = () => {
    const ships = document.querySelectorAll(".ship");
    const cells = dom.playerBoardElement.querySelectorAll(".cell");

    ships.forEach((ship) => {
      ship.addEventListener("dragstart", dragStart);
      ship.addEventListener("dragend", dragEnd);
    });

    cells.forEach((cell) => {
      cell.addEventListener("dragover", dragOver);
      cell.addEventListener("drop", drop);
    });

    dom.rotateButton.addEventListener("click", rotateShip);
  };

  const dragStart = (e) => {
    draggedShip = e.target;
  };

  const dragEnd = () => {
    draggedShip = null;
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    const length = parseInt(draggedShip.dataset.shipLength, 10);

    try {
      const ship = new Ship(length);
      player.gameBoard.placeShip(
        ship,
        [x, y],
        isHorizontal ? "horizontal" : "vertical"
      );
      dom.renderBoard(player.gameBoard.board, dom.playerBoardElement);
      draggedShip.remove();
      setupDragAndDrop();
      if (
        document
          .getElementById("ship-selection")
          .contains(document.querySelector(".ship")) === false
      ) {
        dom.enablePlayButton(true);
        dom.updateMessage("All ships placed. Click Play when ready!");
      }
    } catch (error) {
      dom.updateMessage("Can't place ship there. Try again.");
    }
  };

  const rotateShip = () => {
    isHorizontal = !isHorizontal;

   dom.rotateShips();
   dom.updateMessage(
     `Ship orientation: ${isHorizontal ? "Vertical" : "Horizontal"}`
   );
  };

  const placeShipsRandomly = (player) => {
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
    dom.enablePlayButton(true);
  };

  const startGame = () => {
    dom.renderBoard(player.gameBoard.board, dom.playerBoardElement);
    dom.renderBoard(cpu.gameBoard.board, dom.cpuBoardElement, true);
    dom.updateMessage("Click on the CPU board to attack!");
    currentPlayer = player;
    dom.enableRerollButton(false);
    dom.enablePlayButton(false);
    dom.enableBoardInteraction(true);
    dom.cpuBoardElement.addEventListener("click", handleAttack);
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
    dom.playButton.addEventListener("click", startGame);
    dom.rerollButton.addEventListener("click", () => {
      placeShipsRandomly(player);
      dom.renderBoard(player.gameBoard.board, dom.playerBoardElement);
    });
  };

  return { init, resetGame };
})();

export default game;
