const dom = (() => {
  const playerBoardElement = document.querySelector("#player-board");
  const cpuBoardElement = document.querySelector("#cpu-board");
  const playButton = document.querySelector("#play-button");
  const rerollButton = document.querySelector("#reroll-button");
  const resetButton = document.querySelector("#reset-button");
  const messageElement = document.querySelector("#message");
  const rotateButton = document.querySelector("#rotate-button");
  const ships = document.querySelectorAll(".ship");
  let draggedShip = null;
  let isHorizontal = true;

  function renderBoard(board, element, hideShips = false) {
    element.innerHTML = ""; //what
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
  }

  function updateMessage(message) {
    messageElement.textContent = message;
  }

  function enableRerollButton(enabled) {
    rerollButton.disabled = !enabled;
  }

  function enablePlayButton(enabled) {
    playButton.disabled = !enabled;
  }

  function enableResetButton(enabled) {
    resetButton.disabled = !enabled;
  }

  function enableBoardInteraction(enabled) {
    cpuBoardElement.style.pointerEvents = enabled ? "auto" : "none";
  }

  function setupDragAndDrop(player, Ship) {
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

    rotateButton.addEventListener("click", rotateShips);
  }

  function dragStart(e) {
    draggedShip = e.target;
  }

  function dragEnd() {
    draggedShip = null;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e, player, Ship) {
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
      draggedShip.style.display = "none";
      setupDragAndDrop(player, Ship);

      if (player.gameBoard.ships.length === 6) {
        enablePlayButton(true);
        updateMessage("All ships placed. Click Play when ready!");
      }
    } catch (error) {
      updateMessage("Can't place ship there. Try again.");
    }
  }

  function hideShips() {
    const shipSelection = document.querySelector("#ship-selection");
    shipSelection.style.visibility = "hidden";
  }

  function rotateShips() {
    isHorizontal = !isHorizontal;
    for (let ship = 0; ship < ships.length; ship++) {
      ships[ship].style.flexDirection =
        ships[ship].style.flexDirection === "row" ? "column" : "row";
    }
    updateMessage(
      `Ship orientation: ${isHorizontal ? "Vertical" : "Horizontal"}`
    );
  }

  function resetShips() {
    for (let ship = 0; ship < ships.length; ship++) {
      ships[ship].style.display = "flex";
    }
  }

  return {
    playerBoardElement,
    cpuBoardElement,
    playButton,
    rerollButton,
    rotateButton,
    resetButton,
    renderBoard,
    updateMessage,
    enableRerollButton,
    enableResetButton,
    enablePlayButton,
    enableBoardInteraction,
    setupDragAndDrop,
    dragStart,
    dragEnd,
    dragOver,
    drop,
    rotateShips,
    hideShips,
    resetShips,
  };
})();

export default dom;
