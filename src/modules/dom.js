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

  function updateMessage(message) {
    messageElement.textContent = message;
  }

  function enableBoardInteraction(enabled) {
    cpuBoardElement.style.pointerEvents = enabled ? "auto" : "none";
  }

  function buttonReferenceCheck(element) {
    if (element === "play") return playButton;
    else if (element === "reset") return resetButton;
    else if (element === "reroll") return rerollButton;
    else
      throw new Error("Finding element name reference. Invalid element name");
  }

  function enableElement(element, enabled) {
    element = buttonReferenceCheck(element);
    element.disabled = !enabled;
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
      cell.addEventListener("dragenter", dragEnter);
      cell.addEventListener("dragleave", dragLeave);
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

  function dragEnter(e) {
    e.preventDefault();
    const cells = playerBoardElement.querySelectorAll(".cell");
    e.target.classList.add("hovered");

    processCells(cells, e.target, draggedShip.dataset.shipLength, isHorizontal);

    function isMatchingCell(cell, target, offsetX, offsetY) {
      return (
        parseInt(cell.dataset.x) === parseInt(target.dataset.x) + offsetX &&
        parseInt(cell.dataset.y) === parseInt(target.dataset.y) + offsetY
      );
    }

    function applyHoverClass(cell, target, isHorizontal, offset) {
      const offsetX = isHorizontal ? offset : 0;
      const offsetY = isHorizontal ? 0 : offset;

      if (isMatchingCell(cell, target, offsetX, offsetY)) {
        cell.classList.add("hovered");
      }
    }

    function processCells(cells, target, shipLength, isHorizontal) {
      cells.forEach((cell) => {
        if (cell != 0) {
          for (let i = 1; i < shipLength; i++) {
            applyHoverClass(cell, target, isHorizontal, i);
          }
        }
      });
    }
  }

  function dragLeave(e) {
    e.preventDefault();
    const cells = playerBoardElement.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.classList.remove("hovered");
    });
  }

  function drop(e, player, Ship) {
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

  function setShipsVisibiliy(enabled) {
    const shipSelection = document.querySelector("#ship-selection");
    if (enabled) shipSelection.style.visibility = "visible";
    else shipSelection.style.visibility = "hidden";
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
    setShipsVisibiliy(true);
    for (let ship = 0; ship < ships.length; ship++) {
      ships[ship].style.display = "flex";
    }
  }

  function secureAddEventListener(element, event) {
    if (element === "cpuBoard") element = cpuBoardElement;
    else element = buttonReferenceCheck(element);
    element.addEventListener("click", () => {
      if (element === rerollButton) {
        element.addEventListener("click", () => {
          setRotateButtonVisibility(false);
          setShipsVisibiliy(false); //fix
        });
      }
      event();
    });
  }

  function setRotateButtonVisibility(visibility) {
    if (visibility) rotateButton.style.visibility = "visible";
    else rotateButton.style.visibility = "hidden";
  }

  return {
    renderBoard,
    updateMessage,
    enableElement,
    enableBoardInteraction,
    setupDragAndDrop,
    resetShips,
    secureAddEventListener,
    setRotateButtonVisibility,
  };
})();
export default dom;
