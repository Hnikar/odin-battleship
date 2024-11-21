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

  const endScreen = document.querySelector("#end-screen");
  const winnerText = document.querySelector("#winner-text");
  const hitsCount = document.querySelector("#hits-count");
  const missesCount = document.querySelector("#misses-count");
  const accuracyDisplay = document.querySelector("#accuracy");
  const tryAgainButton = document.querySelector("#try-again-button");

  function toggleEndScreen(winnerName, stats, show) {
    if (show) {
      winnerText.textContent = `${winnerName} Wins!`;
      hitsCount.textContent = stats.hits;
      missesCount.textContent = stats.misses;
      accuracyDisplay.textContent = `${stats.accuracy}%`;

      endScreen.classList.remove("hidden");
      setTimeout(() => {
        endScreen.style.pointerEvents = "auto";
        endScreen.classList.add("visible");
      }, 50);
    } else {
      endScreen.classList.remove("visible");
      setTimeout(() => {
        endScreen.style.pointerEvents = "none";
        endScreen.classList.add("hidden");
      }, 50);
    }
  }

  function renderBoard(board, player, hideShips = false) {
    let element;
    if (player === "player") element = playerBoardElement;
    else if (player === "cpu") element = cpuBoardElement;
    else throw new Error("Render error. Invalid board element");

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
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

  function unrenderCPUBoard() {
    while (cpuBoardElement.firstChild) {
      cpuBoardElement.removeChild(cpuBoardElement.firstChild);
    }
  }

  function updateMessage(message) {
    messageElement.textContent = message;
  }

  function enableBoardInteraction(enabled) {
    cpuBoardElement.style.pointerEvents = enabled ? "auto" : "none";
  }

  function _buttonReferenceCheck(element) {
    switch (element) {
      case "play":
        return playButton;
      case "reset":
        return resetButton;
      case "reroll":
        return rerollButton;
      case "tryAgain":
        return tryAgainButton;
      default:
        throw new Error("Finding element name reference. Invalid element name");
    }
  }

  function enableElement(element, enabled) {
    element = _buttonReferenceCheck(element);
    element.disabled = !enabled;
  }

  function setupDragAndDrop(player, Ship) {
    const ships = document.querySelectorAll(".ship");
    const cells = playerBoardElement.querySelectorAll(".cell");

    ships.forEach((ship) => {
      ship.addEventListener("dragstart", _dragStart);
      ship.addEventListener("dragend", _dragEnd);
    });

    cells.forEach((cell) => {
      cell.addEventListener("dragover", _dragOver);
      cell.addEventListener("drop", (e) => _drop(e, player, Ship));
      cell.addEventListener("dragenter", _dragEnter);
      cell.addEventListener("dragleave", _dragLeave);
    });

    rotateButton.addEventListener("click", _rotateShips);
  }

  function _dragStart(e) {
    draggedShip = e.target;
  }

  function _dragEnd() {
    draggedShip = null;
  }

  function _dragOver(e) {
    e.preventDefault();
  }

  function _dragEnter(e) {
    e.preventDefault();
    const cells = playerBoardElement.querySelectorAll(".cell");
    e.target.classList.add("hovered");

    _processCells(
      cells,
      e.target,
      draggedShip.dataset.shipLength,
      isHorizontal
    );

    function _isMatchingCell(cell, target, offsetX, offsetY) {
      return (
        parseInt(cell.dataset.x) === parseInt(target.dataset.x) + offsetX &&
        parseInt(cell.dataset.y) === parseInt(target.dataset.y) + offsetY
      );
    }

    function _applyHoverClass(cell, target, isHorizontal, offset) {
      const offsetX = isHorizontal ? offset : 0;
      const offsetY = isHorizontal ? 0 : offset;

      if (_isMatchingCell(cell, target, offsetX, offsetY)) {
        cell.classList.add("hovered");
      }
    }

    function _processCells(cells, target, shipLength, isHorizontal) {
      cells.forEach((cell) => {
        if (cell != 0) {
          for (let i = 1; i < shipLength; i++) {
            _applyHoverClass(cell, target, isHorizontal, i);
          }
        }
      });
    }
  }

  function _dragLeave(e) {
    e.preventDefault();
    const cells = playerBoardElement.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.classList.remove("hovered");
    });
  }

  function _drop(e, player, Ship) {
    e.preventDefault();
    const x = parseInt(e.target.dataset.x, 10);
    const y = parseInt(e.target.dataset.y, 10);
    const length = parseInt(draggedShip.dataset.shipLength, 10);
    const cells = playerBoardElement.querySelectorAll(".cell");

    try {
      const ship = new Ship(length);
      player.gameBoard.placeShip(
        ship,
        [x, y],
        isHorizontal ? "horizontal" : "vertical"
      );
      renderBoard(player.gameBoard.board, "player");
      draggedShip.style.display = "none";
      setupDragAndDrop(player, Ship);

      if (player.gameBoard.ships.length === 6) {
        enableElement("play", true);
        rotateButton.style.visibility = "hidden";
        updateMessage("All ships placed. Click Play when ready!");
      }
    } catch (error) {
      cells.forEach((cell) => {
        cell.classList.remove("hovered");
      });
      updateMessage("Can't place ship there. Try again.");
    }
  }

  function _setShipsVisibiliy(enabled) {
    const shipSelection = document.querySelector("#ship-selection");
    shipSelection.style.visibility = enabled ? "visible" : "hidden";
  }

  function _rotateShips() {
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
    _setRotateButtonVisibility(true);
    _setShipsVisibiliy(true);
    for (let ship = 0; ship < ships.length; ship++) {
      ships[ship].style.display = "flex";
    }
  }

  function secureAddEventListener(element, event) {
    if (element === "cpuBoard") element = cpuBoardElement;
    else element = _buttonReferenceCheck(element);
    if (element === rerollButton) {
      element.addEventListener("click", () => {
        _setRotateButtonVisibility(false);
        _setShipsVisibiliy(false);
      });
    } else if (element === tryAgainButton) {
      element.addEventListener("click", () => {
        unrenderCPUBoard();
      });
    }
    element.addEventListener("click", event);
  }

  function _setRotateButtonVisibility(visibility) {
    if (visibility) rotateButton.style.visibility = "visible";
    else rotateButton.style.visibility = "hidden";
  }

  function hideButtons() {
    enableElement("reroll", false);
    enableElement("play", false);
    enableElement("reset", false);
    _setRotateButtonVisibility(false);
  }

  return {
    renderBoard,
    updateMessage,
    hideButtons,
    enableElement,
    enableBoardInteraction,
    setupDragAndDrop,
    resetShips,
    secureAddEventListener,
    toggleEndScreen,
  };
})();
export default dom;