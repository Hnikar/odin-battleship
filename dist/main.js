/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/game */ \"./src/modules/game.js\");\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n  _modules_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].resetGame();\r\n  _modules_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\r\n});\r\n\n\n//# sourceURL=webpack://odin-battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst dom = (() => {\r\n  const playerBoardElement = document.querySelector(\"#player-board\");\r\n  const cpuBoardElement = document.querySelector(\"#cpu-board\");\r\n  const playButton = document.querySelector(\"#play-button\");\r\n  const rerollButton = document.querySelector(\"#reroll-button\");\r\n  const messageElement = document.querySelector(\"#message\");\r\n  const rotateButton = document.querySelector(\"#rotate-button\");\r\n  const ships = document.querySelectorAll(\".ship\");\r\n  let draggedShip = null;\r\n  let isHorizontal = true;\r\n\r\n  const renderBoard = (board, element, hideShips = false) => {\r\n    element.innerHTML = \"\";\r\n    board.forEach((row, x) => {\r\n      row.forEach((cell, y) => {\r\n        const cellElement = document.createElement(\"div\");\r\n        cellElement.dataset.x = x;\r\n        cellElement.dataset.y = y;\r\n        cellElement.classList.add(\"cell\");\r\n        if (cell === 1 && !hideShips) {\r\n          cellElement.classList.add(\"ship\");\r\n        } else if (cell === 2) {\r\n          cellElement.classList.add(\"miss\");\r\n        } else if (cell === 3) {\r\n          cellElement.classList.add(\"hit\");\r\n        }\r\n        element.appendChild(cellElement);\r\n      });\r\n    });\r\n  };\r\n\r\n  const rotateShips = () => {\r\n    for (let ship = 0; ship < ships.length; ship++) {\r\n      ships[ship].style.flexDirection =\r\n        ships[ship].style.flexDirection === \"row\" ? \"column\" : \"row\";\r\n    }\r\n  };\r\n\r\n  const updateMessage = (message) => {\r\n    messageElement.textContent = message;\r\n  };\r\n\r\n  const enableRerollButton = (enabled) => {\r\n    rerollButton.disabled = !enabled;\r\n  };\r\n\r\n  const enablePlayButton = (enabled) => {\r\n    playButton.disabled = !enabled;\r\n  };\r\n\r\n  const enableBoardInteraction = (enabled) => {\r\n    cpuBoardElement.style.pointerEvents = enabled ? \"auto\" : \"none\";\r\n  };\r\n\r\n  const setupDragAndDrop = (player, Ship) => {\r\n    const ships = document.querySelectorAll(\".ship\");\r\n    const cells = playerBoardElement.querySelectorAll(\".cell\");\r\n\r\n    ships.forEach((ship) => {\r\n      ship.addEventListener(\"dragstart\", dragStart);\r\n      ship.addEventListener(\"dragend\", dragEnd);\r\n    });\r\n\r\n    cells.forEach((cell) => {\r\n      cell.addEventListener(\"dragover\", dragOver);\r\n      cell.addEventListener(\"drop\", (e) => drop(e, player, Ship));\r\n    });\r\n\r\n    rotateButton.addEventListener(\"click\", rotateShip);\r\n  };\r\n\r\n  const dragStart = (e) => {\r\n    draggedShip = e.target;\r\n  };\r\n\r\n  const dragEnd = () => {\r\n    draggedShip = null;\r\n  };\r\n\r\n  const dragOver = (e) => {\r\n    e.preventDefault();\r\n  };\r\n\r\n  const drop = (e, player, Ship) => {\r\n    e.preventDefault();\r\n    const x = parseInt(e.target.dataset.x, 10);\r\n    const y = parseInt(e.target.dataset.y, 10);\r\n    const length = parseInt(draggedShip.dataset.shipLength, 10);\r\n\r\n    try {\r\n      const ship = new Ship(length);\r\n      player.gameBoard.placeShip(\r\n        ship,\r\n        [x, y],\r\n        isHorizontal ? \"horizontal\" : \"vertical\"\r\n      );\r\n      renderBoard(player.gameBoard.board, playerBoardElement);\r\n      draggedShip.remove();\r\n      setupDragAndDrop(player, Ship);\r\n\r\n      if (player.gameBoard.ships.length === 6) {\r\n        enablePlayButton(true);\r\n        updateMessage(\"All ships placed. Click Play when ready!\");\r\n      }\r\n    } catch (error) {\r\n      updateMessage(\"Can't place ship there. Try again.\");\r\n    }\r\n  };\r\n\r\n  const rotateShip = () => {\r\n    isHorizontal = !isHorizontal;\r\n    rotateShips();\r\n    updateMessage(\r\n      `Ship orientation: ${isHorizontal ? \"Vertical\" : \"Horizontal\"}`\r\n    );\r\n  };\r\n\r\n  return {\r\n    playerBoardElement,\r\n    cpuBoardElement,\r\n    playButton,\r\n    rerollButton,\r\n    rotateButton,\r\n    renderBoard,\r\n    updateMessage,\r\n    enableRerollButton,\r\n    enablePlayButton,\r\n    enableBoardInteraction,\r\n    rotateShips,\r\n    setupDragAndDrop,\r\n    dragStart,\r\n    dragEnd,\r\n    dragOver,\r\n    drop,\r\n    rotateShip,\r\n  };\r\n})();\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\r\n\n\n//# sourceURL=webpack://odin-battleship/./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/modules/gameboard.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/modules/player.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship.js */ \"./src/modules/ship.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.js */ \"./src/modules/dom.js\");\n\r\n\r\n\r\n\r\n\r\nconst game = (() => {\r\n  let player, cpu, currentPlayer;\r\n\r\n  const init = () => {\r\n    player = new _player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](false, \"Player\");\r\n    cpu = new _player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](true);\r\n    player.gameBoard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    cpu.gameBoard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    placeShipsRandomly(cpu);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(player.gameBoard.board, _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].playerBoardElement);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"Drag and drop your ships onto the board!\");\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableRerollButton(true);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enablePlayButton(false);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoardInteraction(false);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].setupDragAndDrop(player, _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\n  };\r\n\r\n  const placeShipsRandomly = (player) => {\r\n    player.gameBoard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    const ships = [\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](4),\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](3),\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](3),\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](2),\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](2),\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](1),\r\n    ];\r\n    ships.forEach((ship) => {\r\n      let placed = false;\r\n      while (!placed) {\r\n        const orientation = Math.random() < 0.5 ? \"horizontal\" : \"vertical\";\r\n        const x = Math.floor(Math.random() * 10);\r\n        const y = Math.floor(Math.random() * 10);\r\n        try {\r\n          player.gameBoard.placeShip(ship, [x, y], orientation);\r\n          placed = true;\r\n        } catch (e) {}\r\n      }\r\n    });\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enablePlayButton(true);\r\n  };\r\n\r\n  const startGame = () => {\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(player.gameBoard.board, _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].playerBoardElement);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(cpu.gameBoard.board, _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].cpuBoardElement, true);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"Click on the CPU board to attack!\");\r\n    currentPlayer = player;\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableRerollButton(false);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enablePlayButton(false);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoardInteraction(true);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].cpuBoardElement.addEventListener(\"click\", handleAttack);\r\n  };\r\n\r\n  const handleAttack = (e) => {\r\n    const x = parseInt(e.target.dataset.x, 10);\r\n    const y = parseInt(e.target.dataset.y, 10);\r\n    if (cpu.gameBoard.board[x][y] === 2 || cpu.gameBoard.board[x][y] === 3) {\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"You already attacked this spot! Choose another.\");\r\n      return;\r\n    }\r\n    if (cpu.gameBoard.receiveAttack([x, y])) {\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"Hit! Attack again.\");\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(cpu.gameBoard.board, _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].cpuBoardElement, true);\r\n      if (cpu.gameBoard.areAllShipsSunk()) {\r\n        endGame(player);\r\n        return;\r\n      }\r\n    } else {\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"Miss! CPU's turn.\");\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(cpu.gameBoard.board, _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].cpuBoardElement, true);\r\n      switchTurns();\r\n    }\r\n  };\r\n\r\n  const switchTurns = () => {\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoardInteraction(false);\r\n    setTimeout(cpuAttack, 1000);\r\n  };\r\n\r\n  const cpuAttack = () => {\r\n    let x,\r\n      y,\r\n      validAttack = false;\r\n    while (!validAttack) {\r\n      x = Math.floor(Math.random() * 10);\r\n      y = Math.floor(Math.random() * 10);\r\n      if (\r\n        player.gameBoard.board[x][y] === 0 ||\r\n        player.gameBoard.board[x][y] === 1\r\n      ) {\r\n        validAttack = true;\r\n      }\r\n    }\r\n    const hit = player.gameBoard.receiveAttack([x, y]);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(player.gameBoard.board, _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].playerBoardElement);\r\n    if (hit) {\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"CPU hit! CPU attacks again.\");\r\n      if (player.gameBoard.areAllShipsSunk()) {\r\n        endGame(cpu);\r\n        return;\r\n      }\r\n      setTimeout(cpuAttack, 1000);\r\n    } else {\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"CPU missed! Your turn.\");\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoardInteraction(true);\r\n    }\r\n  };\r\n\r\n  const endGame = (winner) => {\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(`${winner.name} wins!`);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoardInteraction(false);\r\n  };\r\n\r\n  const resetGame = () => {\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].playButton.addEventListener(\"click\", startGame);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].rerollButton.addEventListener(\"click\", () => {\r\n      placeShipsRandomly(player);\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(player.gameBoard.board, _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].playerBoardElement);\r\n    });\r\n  };\r\n\r\n  return { init, resetGame };\r\n})();\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);\r\n\n\n//# sourceURL=webpack://odin-battleship/./src/modules/game.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\nclass Gameboard {\r\n  constructor() {\r\n    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));\r\n    this.missedAttacks = [];\r\n    this.ships = [];\r\n  }\r\n\r\n  isValidPlacement(ship, [X, Y], orientation) {\r\n    const shipLength = ship.length;\r\n\r\n    for (let i = 0; i < shipLength; i++) {\r\n      let x = X,\r\n        y = Y;\r\n\r\n      if (orientation === \"horizontal\") {\r\n        x = X + i;\r\n      } else {\r\n        y = Y + i;\r\n      }\r\n\r\n      if (x >= 10 || y >= 10) {\r\n        return false;\r\n      }\r\n\r\n      for (let dx = -1; dx <= 1; dx++) {\r\n        for (let dy = -1; dy <= 1; dy++) {\r\n          const nx = x + dx;\r\n          const ny = y + dy;\r\n\r\n          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {\r\n            if (this.board[nx][ny] === 1) {\r\n              return false;\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n\r\n    return true;\r\n  }\r\n\r\n  placeShip(ship, [X, Y], orientation) {\r\n    if (!this.isValidPlacement(ship, [X, Y], orientation)) {\r\n      throw new Error(\r\n        \"Invalid placement: ships cannot be placed near each other or out of bounds.\"\r\n      );\r\n    }\r\n\r\n    const shipCoordinates = [];\r\n\r\n    if (orientation === \"horizontal\") {\r\n      for (let i = 0; i < ship.length; i++) {\r\n        this.board[X + i][Y] = 1;\r\n        shipCoordinates.push([X + i, Y]);\r\n      }\r\n    } else {\r\n      for (let i = 0; i < ship.length; i++) {\r\n        this.board[X][Y + i] = 1;\r\n        shipCoordinates.push([X, Y + i]);\r\n      }\r\n    }\r\n\r\n    this.ships.push({ ship, coordinates: shipCoordinates, hits: 0 });\r\n  }\r\n\r\n  receiveAttack([X, Y]) {\r\n    if (this.board[X][Y] === 1) {\r\n      this.board[X][Y] = 3;\r\n\r\n      const ship = this.ships.find((ship) =>\r\n        ship.coordinates.some((coord) => coord[0] === X && coord[1] === Y)\r\n      );\r\n\r\n      ship.hits += 1;\r\n\r\n      if (ship.hits === ship.ship.length) {\r\n        this.markSurroundingCells(ship.coordinates);\r\n      }\r\n\r\n      return true;\r\n    } else if (this.board[X][Y] === 0) {\r\n      this.board[X][Y] = 2;\r\n      this.missedAttacks.push([X, Y]);\r\n      return false;\r\n    }\r\n  }\r\n\r\n  markSurroundingCells(coordinates) {\r\n    coordinates.forEach(([X, Y]) => {\r\n      for (let dx = -1; dx <= 1; dx++) {\r\n        for (let dy = -1; dy <= 1; dy++) {\r\n          const nx = X + dx;\r\n          const ny = Y + dy;\r\n\r\n          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {\r\n            if (this.board[nx][ny] === 0) {\r\n              this.board[nx][ny] = 2;\r\n              this.missedAttacks.push([nx, ny]);\r\n            }\r\n          }\r\n        }\r\n      }\r\n    });\r\n  }\r\n\r\n  areAllShipsSunk() {\r\n    return this.board.every((row) => row.every((cell) => cell !== 1));\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\n\r\nclass Player {\r\n  constructor(cpu, name) {\r\n    this.cpu = cpu;\r\n    if (cpu === true) {\r\n      this.name = \"CPU\";\r\n    } else {\r\n      if (name.length > 10 || name === \"\") {\r\n        throw new Error(\"Invalid player name\");\r\n      } else {\r\n        this.name = name;\r\n      }\r\n    }\r\n  \r\n    this.gameBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-battleship/./src/modules/player.js?");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\r\n  constructor(length) {\r\n    this.length = (length < 1 || length > 4) ? (() => { throw new Error(\"Invalid ship length\"); })() : length;\r\n    this.hitCount = 0;\r\n  }\r\n  hit() { this.hitCount++; }\r\n  isSunk() { return this.hitCount === this.length ? true : false; }\r\n}\n\n//# sourceURL=webpack://odin-battleship/./src/modules/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;