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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/game */ \"./src/modules/game.js\");\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n  _modules_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].btnInit();\r\n  _modules_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].gameInit();\r\n});\r\n\n\n//# sourceURL=webpack://odin-battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst dom = (() => {\r\n  const playerBoardElement = document.querySelector(\"#player-board\");\r\n  const cpuBoardElement = document.querySelector(\"#cpu-board\");\r\n  const playButton = document.querySelector(\"#play-button\");\r\n  const rerollButton = document.querySelector(\"#reroll-button\");\r\n  const resetButton = document.querySelector(\"#reset-button\");\r\n  const messageElement = document.querySelector(\"#message\");\r\n  const rotateButton = document.querySelector(\"#rotate-button\");\r\n  const ships = document.querySelectorAll(\".ship\");\r\n  let draggedShip = null;\r\n  let isHorizontal = true;\r\n\r\n  function renderBoard(board, player, hideShips = false) {\r\n    let element;\r\n    if (player === \"player\") element = playerBoardElement;\r\n    else if (player === \"cpu\") element = cpuBoardElement;\r\n    else throw new Error(\"Render error. Invalid board element\");\r\n\r\n    while (element.firstChild) {\r\n      element.removeChild(element.firstChild);\r\n    }\r\n    board.forEach((row, x) => {\r\n      row.forEach((cell, y) => {\r\n        const cellElement = document.createElement(\"div\");\r\n        cellElement.dataset.x = x;\r\n        cellElement.dataset.y = y;\r\n        cellElement.classList.add(\"cell\");\r\n        if (cell === 1 && !hideShips) {\r\n          cellElement.classList.add(\"ship\");\r\n        } else if (cell === 2) {\r\n          cellElement.classList.add(\"miss\");\r\n        } else if (cell === 3) {\r\n          cellElement.classList.add(\"hit\");\r\n        }\r\n        element.appendChild(cellElement);\r\n      });\r\n    });\r\n  }\r\n\r\n  function updateMessage(message) {\r\n    messageElement.textContent = message;\r\n  }\r\n\r\n  function enableBoardInteraction(enabled) {\r\n    cpuBoardElement.style.pointerEvents = enabled ? \"auto\" : \"none\";\r\n  }\r\n\r\n  function _buttonReferenceCheck(element) {\r\n    if (element === \"play\") return playButton;\r\n    else if (element === \"reset\") return resetButton;\r\n    else if (element === \"reroll\") return rerollButton;\r\n    else\r\n      throw new Error(\"Finding element name reference. Invalid element name\");\r\n  }\r\n\r\n  function enableElement(element, enabled) {\r\n    element = _buttonReferenceCheck(element);\r\n    element.disabled = !enabled;\r\n  }\r\n\r\n  function setupDragAndDrop(player, Ship) {\r\n    const ships = document.querySelectorAll(\".ship\");\r\n    const cells = playerBoardElement.querySelectorAll(\".cell\");\r\n\r\n    ships.forEach((ship) => {\r\n      ship.addEventListener(\"dragstart\", _dragStart);\r\n      ship.addEventListener(\"dragend\", _dragEnd);\r\n    });\r\n\r\n    cells.forEach((cell) => {\r\n      cell.addEventListener(\"dragover\", _dragOver);\r\n      cell.addEventListener(\"drop\", (e) => _drop(e, player, Ship));\r\n      cell.addEventListener(\"dragenter\", _dragEnter);\r\n      cell.addEventListener(\"dragleave\", _dragLeave);\r\n    });\r\n\r\n    rotateButton.addEventListener(\"click\", _rotateShips);\r\n  }\r\n\r\n  function _dragStart(e) {\r\n    draggedShip = e.target;\r\n  }\r\n\r\n  function _dragEnd() {\r\n    draggedShip = null;\r\n  }\r\n\r\n  function _dragOver(e) {\r\n    e.preventDefault();\r\n  }\r\n\r\n  function _dragEnter(e) {\r\n    e.preventDefault();\r\n    const cells = playerBoardElement.querySelectorAll(\".cell\");\r\n    e.target.classList.add(\"hovered\");\r\n\r\n    _processCells(\r\n      cells,\r\n      e.target,\r\n      draggedShip.dataset.shipLength,\r\n      isHorizontal\r\n    );\r\n\r\n    function _isMatchingCell(cell, target, offsetX, offsetY) {\r\n      return (\r\n        parseInt(cell.dataset.x) === parseInt(target.dataset.x) + offsetX &&\r\n        parseInt(cell.dataset.y) === parseInt(target.dataset.y) + offsetY\r\n      );\r\n    }\r\n\r\n    function _applyHoverClass(cell, target, isHorizontal, offset) {\r\n      const offsetX = isHorizontal ? offset : 0;\r\n      const offsetY = isHorizontal ? 0 : offset;\r\n\r\n      if (_isMatchingCell(cell, target, offsetX, offsetY)) {\r\n        cell.classList.add(\"hovered\");\r\n      }\r\n    }\r\n\r\n    function _processCells(cells, target, shipLength, isHorizontal) {\r\n      cells.forEach((cell) => {\r\n        if (cell != 0) {\r\n          for (let i = 1; i < shipLength; i++) {\r\n            _applyHoverClass(cell, target, isHorizontal, i);\r\n          }\r\n        }\r\n      });\r\n    }\r\n  }\r\n\r\n  function _dragLeave(e) {\r\n    e.preventDefault();\r\n    const cells = playerBoardElement.querySelectorAll(\".cell\");\r\n    cells.forEach((cell) => {\r\n      cell.classList.remove(\"hovered\");\r\n    });\r\n  }\r\n\r\n  function _drop(e, player, Ship) {\r\n    e.preventDefault();\r\n    const x = parseInt(e.target.dataset.x, 10);\r\n    const y = parseInt(e.target.dataset.y, 10);\r\n    const length = parseInt(draggedShip.dataset.shipLength, 10);\r\n    const cells = playerBoardElement.querySelectorAll(\".cell\");\r\n\r\n    try {\r\n      const ship = new Ship(length);\r\n      player.gameBoard.placeShip(\r\n        ship,\r\n        [x, y],\r\n        isHorizontal ? \"horizontal\" : \"vertical\"\r\n      );\r\n      renderBoard(player.gameBoard.board, \"player\");\r\n      draggedShip.style.display = \"none\";\r\n      setupDragAndDrop(player, Ship);\r\n\r\n      if (player.gameBoard.ships.length === 6) {\r\n        enableElement(\"play\", true);\r\n        rotateButton.style.visibility = \"hidden\";\r\n        updateMessage(\"All ships placed. Click Play when ready!\");\r\n      }\r\n    } catch (error) {\r\n      cells.forEach((cell) => {\r\n        cell.classList.remove(\"hovered\");\r\n      });\r\n      updateMessage(\"Can't place ship there. Try again.\");\r\n    }\r\n  }\r\n\r\n  function _setShipsVisibiliy(enabled) {\r\n    const shipSelection = document.querySelector(\"#ship-selection\");\r\n    shipSelection.style.visibility = enabled ? \"visible\" : \"hidden\";\r\n  }\r\n\r\n  function _rotateShips() {\r\n    isHorizontal = !isHorizontal;\r\n    for (let ship = 0; ship < ships.length; ship++) {\r\n      ships[ship].style.flexDirection =\r\n        ships[ship].style.flexDirection === \"row\" ? \"column\" : \"row\";\r\n    }\r\n    updateMessage(\r\n      `Ship orientation: ${isHorizontal ? \"Vertical\" : \"Horizontal\"}`\r\n    );\r\n  }\r\n\r\n  function resetShips() {\r\n    _setRotateButtonVisibility(true);\r\n    _setShipsVisibiliy(true);\r\n    for (let ship = 0; ship < ships.length; ship++) {\r\n      ships[ship].style.display = \"flex\";\r\n    }\r\n  }\r\n\r\n  function secureAddEventListener(element, event) {\r\n    if (element === \"cpuBoard\") element = cpuBoardElement;\r\n    else element = _buttonReferenceCheck(element);\r\n    element.addEventListener(\"click\", () => {\r\n      if (element === rerollButton) {\r\n        _setRotateButtonVisibility(false);\r\n        _setShipsVisibiliy(false);\r\n      }\r\n      event();\r\n    });\r\n  }\r\n\r\n  function _setRotateButtonVisibility(visibility) {\r\n    if (visibility) rotateButton.style.visibility = \"visible\";\r\n    else rotateButton.style.visibility = \"hidden\";\r\n  }\r\n\r\n  function hideButtons() {\r\n    enableElement(\"reroll\", false);\r\n    enableElement(\"play\", false);\r\n    enableElement(\"reset\", false);\r\n    _setRotateButtonVisibility(false);\r\n  }\r\n\r\n  return {\r\n    renderBoard,\r\n    updateMessage,\r\n    hideButtons,\r\n    enableElement,\r\n    enableBoardInteraction,\r\n    setupDragAndDrop,\r\n    resetShips,\r\n    secureAddEventListener,\r\n  };\r\n})();\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n//# sourceURL=webpack://odin-battleship/./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/modules/gameboard.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/modules/player.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship.js */ \"./src/modules/ship.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.js */ \"./src/modules/dom.js\");\n\r\n\r\n\r\n\r\n\r\nconst game = (() => {\r\n  let player, cpu, currentPlayer;\r\n\r\n  function gameInit() {\r\n    player = new _player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](false, \"Player\");\r\n    cpu = new _player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](true);\r\n    player.gameBoard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    cpu.gameBoard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    _placeShipsRandomly(cpu);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(player.gameBoard.board, \"player\");\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"Drag and drop your ships onto the board!\");\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableElement(\"reroll\", true);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableElement(\"play\", false);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableElement(\"reset\", true);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resetShips();\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoardInteraction(false);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].setupDragAndDrop(player, _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\n  }\r\n\r\n  function _placeShipsRandomly(player) {\r\n    player.gameBoard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    const ships = [\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](4),\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](3),\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](3),\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](2),\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](2),\r\n      new _ship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](1),\r\n    ];\r\n    ships.forEach((ship) => {\r\n      let placed = false;\r\n      while (!placed) {\r\n        const orientation = Math.random() < 0.5 ? \"horizontal\" : \"vertical\";\r\n        const x = Math.floor(Math.random() * 10);\r\n        const y = Math.floor(Math.random() * 10);\r\n        try {\r\n          player.gameBoard.placeShip(ship, [x, y], orientation);\r\n          placed = true;\r\n        } catch (e) {}\r\n      }\r\n    });\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableElement(\"play\", true);\r\n  }\r\n\r\n  function _startGame() {\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(player.gameBoard.board, \"player\");\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(cpu.gameBoard.board, \"cpu\", true);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"Click on the CPU board to attack!\");\r\n    currentPlayer = player;\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].hideButtons();\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoardInteraction(true);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].secureAddEventListener(\"cpuBoard\", _handleAttack);\r\n  }\r\n\r\n  function _handleAttack(e) {\r\n    const x = parseInt(e.target.dataset.x, 10);\r\n    const y = parseInt(e.target.dataset.y, 10);\r\n    if (cpu.gameBoard.board[x][y] === 2 || cpu.gameBoard.board[x][y] === 3) {\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"You already attacked this spot! Choose another.\");\r\n      return;\r\n    }\r\n    if (cpu.gameBoard.receiveAttack([x, y])) {\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"Hit! Attack again.\");\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(cpu.gameBoard.board, \"cpu\", true);\r\n      if (cpu.gameBoard.areAllShipsSunk()) {\r\n        _endGame(player);\r\n        return;\r\n      }\r\n    } else {\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"Miss! CPU's turn.\");\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(cpu.gameBoard.board, \"cpu\", true);\r\n      _switchTurns();\r\n    }\r\n  }\r\n\r\n  function _switchTurns() {\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoardInteraction(false);\r\n    setTimeout(_cpuAttack, 1000);\r\n  }\r\n\r\n  function _cpuAttack() {\r\n    let x,\r\n      y,\r\n      validAttack = false;\r\n    while (!validAttack) {\r\n      x = Math.floor(Math.random() * 10);\r\n      y = Math.floor(Math.random() * 10);\r\n      if (\r\n        player.gameBoard.board[x][y] === 0 ||\r\n        player.gameBoard.board[x][y] === 1\r\n      ) {\r\n        validAttack = true;\r\n      }\r\n    }\r\n    const hit = player.gameBoard.receiveAttack([x, y]);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(player.gameBoard.board, \"player\");\r\n    if (hit) {\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"CPU hit! CPU attacks again.\");\r\n      if (player.gameBoard.areAllShipsSunk()) {\r\n        _endGame(cpu);\r\n        return;\r\n      }\r\n      setTimeout(_cpuAttack, 1000);\r\n    } else {\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(\"CPU missed! Your turn.\");\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoardInteraction(true);\r\n    }\r\n  }\r\n\r\n  function _endGame(winner) {\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].updateMessage(`${winner.name} wins!`);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].enableBoardInteraction(false);\r\n  }\r\n\r\n  function btnInit() {\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].secureAddEventListener(\"play\", _startGame);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].secureAddEventListener(\"reset\", gameInit);\r\n    _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].secureAddEventListener(\"reroll\", () => {\r\n      _placeShipsRandomly(player);\r\n      _dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderBoard(player.gameBoard.board, \"player\");\r\n    });\r\n  }\r\n\r\n  return { gameInit, btnInit };\r\n})();\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);\n\n//# sourceURL=webpack://odin-battleship/./src/modules/game.js?");

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