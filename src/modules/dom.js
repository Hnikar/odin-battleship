const dom = (() => {
  const playerBoardElement = document.getElementById("player-board");
  const cpuBoardElement = document.getElementById("cpu-board");
  const messageElement = document.getElementById("message");
  const playButton = document.getElementById("play-button");
  const rerollButton = document.getElementById("reroll-button");

  const renderBoard = (board, boardElement, isCPU = false) => {
    boardElement.innerHTML = "";
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        if (cell === 1 && !isCPU) {
          cellElement.classList.add("ship");
        } else if (cell === 2) {
          cellElement.classList.add("miss");
        } else if (cell === 3) {
          cellElement.classList.add("hit");
        }
        cellElement.dataset.x = i;
        cellElement.dataset.y = j;
        boardElement.appendChild(cellElement);
      });
    });
  };

  const updateMessage = (msg) => {
    messageElement.textContent = msg;
  };

  const enableBoardInteraction = (enable) => {
    cpuBoardElement.style.pointerEvents = enable ? "auto" : "none";
  };

  return {
    renderBoard,
    updateMessage,
    enableBoardInteraction,
    playerBoardElement,
    cpuBoardElement,
    playButton,
    rerollButton,
  };
})();

export default dom;
