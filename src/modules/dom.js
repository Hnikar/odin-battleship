const dom = (() => {
  const playerBoardElement = document.querySelector("#player-board");
  const cpuBoardElement = document.querySelector("#cpu-board");
  const playButton = document.querySelector("#play-button");
  const rerollButton = document.querySelector("#reroll-button");
  const messageElement = document.querySelector("#message");
  const rotateButton = document.querySelector("#rotate-button");
  const ships = document.querySelectorAll(".ship");
  let draggedShip = null;
  let isHorizontal = true;

  const renderBoard = (board, element, hideShips = false) => {
    element.innerHTML = "";
    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        const cellElement = document.createElement("div");
        cellElement.dataset.x = x;
        cellElement.dataset.y = y;
        cellElement.classList.add("cell");
        if (cell === 1 && !hideShips) {
          cellElement.classList.add("ship");
        } else if (cell === 2) {
          cellElement.classList.add("miss");
        } else if (cell === 3) {
          cellElement.classList.add("hit");
        }
        element.appendChild(cellElement);
      });
    });
  };

  const rotateShips = () => {
    for (let ship = 0; ship < ships.length; ship++) {
      ships[ship].style.flexDirection =
        ships[ship].style.flexDirection === "row" ? "column" : "row";
    }
  };

  const updateMessage = (message) => {
    messageElement.textContent = message;
  };

  const enableRerollButton = (enabled) => {
    rerollButton.disabled = !enabled;
  };

  const enablePlayButton = (enabled) => {
    playButton.disabled = !enabled;
  };

  const enableBoardInteraction = (enabled) => {
    cpuBoardElement.style.pointerEvents = enabled ? "auto" : "none";
  };

  const setupDragAndDrop = (player, Ship) => {
    const ships = document.querySelectorAll(".ship");
    const cells = playerBoardElement.querySelectorAll(".cell");

    ships.forEach((ship) => {
      ship.addEventListener("dragstart", dragStart);
      ship.addEventListener("dragend", dragEnd);
    });

    cells.forEach((cell) => {
      cell.addEventListener("dragover", dragOver);
      cell.addEventListener("drop", (e) => drop(e, player, Ship));
    });

    rotateButton.addEventListener("click", rotateShip);
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

  const drop = (e, player, Ship) => {
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
      renderBoard(player.gameBoard.board, playerBoardElement);
      draggedShip.remove();
      setupDragAndDrop(player, Ship);

      if (player.gameBoard.ships.length === 6) {
        enablePlayButton(true);
        updateMessage("All ships placed. Click Play when ready!");
      }
    } catch (error) {
      updateMessage("Can't place ship there. Try again.");
    }
  };

  const rotateShip = () => {
    isHorizontal = !isHorizontal;
    rotateShips();
    updateMessage(
      `Ship orientation: ${isHorizontal ? "Vertical" : "Horizontal"}`
    );
  };

  return {
    playerBoardElement,
    cpuBoardElement,
    playButton,
    rerollButton,
    rotateButton,
    renderBoard,
    updateMessage,
    enableRerollButton,
    enablePlayButton,
    enableBoardInteraction,
    rotateShips,
    setupDragAndDrop,
    dragStart,
    dragEnd,
    dragOver,
    drop,
    rotateShip,
  };
})();

export default dom;
