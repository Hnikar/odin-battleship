const dom = (() => {
  const playerBoardElement = document.querySelector("#player-board");
  const cpuBoardElement = document.querySelector("#cpu-board");
  const playButton = document.querySelector("#play-button");
  const rerollButton = document.querySelector("#reroll-button");
  const messageElement = document.querySelector("#message");
  const rotateButton = document.querySelector("#rotate-button");
  const ships = document.querySelectorAll(".ship");

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
  };
})();

export default dom;