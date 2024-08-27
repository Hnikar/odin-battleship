(()=>{"use strict";class e{constructor(){this.board=Array.from({length:10},(()=>Array(10).fill(0))),this.missedAttacks=[],this.ships=[]}isValidPlacement(e,[t,a],r){const o=e.length;for(let e=0;e<o;e++){let o=t,n=a;if("horizontal"===r?o=t+e:n=a+e,o>=10||n>=10)return!1;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++){const a=o+e,r=n+t;if(a>=0&&a<10&&r>=0&&r<10&&1===this.board[a][r])return!1}}return!0}placeShip(e,[t,a],r){if(!this.isValidPlacement(e,[t,a],r))throw new Error("Invalid placement: ships cannot be placed near each other or out of bounds.");const o=[];if("horizontal"===r)for(let r=0;r<e.length;r++)this.board[t+r][a]=1,o.push([t+r,a]);else for(let r=0;r<e.length;r++)this.board[t][a+r]=1,o.push([t,a+r]);this.ships.push({ship:e,coordinates:o,hits:0})}receiveAttack([e,t]){if(1===this.board[e][t]){this.board[e][t]=3;const a=this.ships.find((a=>a.coordinates.some((a=>a[0]===e&&a[1]===t))));return a.hits+=1,a.hits===a.ship.length&&this.markSurroundingCells(a.coordinates),!0}if(0===this.board[e][t])return this.board[e][t]=2,this.missedAttacks.push([e,t]),!1}markSurroundingCells(e){e.forEach((([e,t])=>{for(let a=-1;a<=1;a++)for(let r=-1;r<=1;r++){const o=e+a,n=t+r;o>=0&&o<10&&n>=0&&n<10&&0===this.board[o][n]&&(this.board[o][n]=2,this.missedAttacks.push([o,n]))}}))}areAllShipsSunk(){return this.board.every((e=>e.every((e=>1!==e))))}}class t{constructor(t,a){if(this.cpu=t,!0===t)this.name="CPU";else{if(a.length>10||""===a)throw new Error("Invalid player name");this.name=a}this.gameBoard=new e}}class a{constructor(e){this.length=e<1||e>4?(()=>{throw new Error("Invalid ship length")})():e,this.hitCount=0}hit(){this.hitCount++}isSunk(){return this.hitCount===this.length}}const r=(()=>{const e=document.getElementById("player-board"),t=document.getElementById("cpu-board"),a=document.getElementById("message"),r=document.getElementById("play-button"),o=document.getElementById("reroll-button");return{renderBoard:(e,t,a=!1)=>{t.innerHTML="",e.forEach(((e,r)=>{e.forEach(((e,o)=>{const n=document.createElement("div");n.classList.add("cell"),1!==e||a?2===e?n.classList.add("miss"):3===e&&n.classList.add("hit"):n.classList.add("ship"),n.dataset.x=r,n.dataset.y=o,t.appendChild(n)}))}))},updateMessage:e=>{a.textContent=e},enableBoardInteraction:e=>{t.style.pointerEvents=e?"auto":"none"},playerBoardElement:e,cpuBoardElement:t,playButton:r,rerollButton:o}})(),o=(()=>{let o,n,s;const d=()=>{o=new t(!1,"Player"),n=new t(!0),i(o),i(n),r.renderBoard(o.gameBoard.board,r.playerBoardElement),r.renderBoard(n.gameBoard.board,r.cpuBoardElement,!0),r.updateMessage("Click on the CPU board to attack!"),s=o,r.enableBoardInteraction(!0),r.cpuBoardElement.addEventListener("click",l)},i=e=>{[new a(4),new a(3),new a(3),new a(2),new a(2),new a(1)].forEach((t=>{let a=!1;for(;!a;){const r=Math.random()<.5?"horizontal":"vertical",o=Math.floor(10*Math.random()),n=Math.floor(10*Math.random());try{e.gameBoard.placeShip(t,[o,n],r),a=!0}catch(e){}}}))},l=e=>{const t=parseInt(e.target.dataset.x,10),a=parseInt(e.target.dataset.y,10);if(2!==n.gameBoard.board[t][a]&&3!==n.gameBoard.board[t][a])if(n.gameBoard.receiveAttack([t,a])){if(r.updateMessage("Hit! Attack again."),r.renderBoard(n.gameBoard.board,r.cpuBoardElement,!0),n.gameBoard.areAllShipsSunk())return void u(o)}else r.updateMessage("Miss! CPU's turn."),r.renderBoard(n.gameBoard.board,r.cpuBoardElement,!0),h();else r.updateMessage("You already attacked this spot! Choose another.")},h=()=>{r.enableBoardInteraction(!1),setTimeout(c,1e3)},c=()=>{let e,t,a=!1;for(;!a;)e=Math.floor(10*Math.random()),t=Math.floor(10*Math.random()),0!==o.gameBoard.board[e][t]&&1!==o.gameBoard.board[e][t]||(a=!0);const s=o.gameBoard.receiveAttack([e,t]);if(r.renderBoard(o.gameBoard.board,r.playerBoardElement),s){if(r.updateMessage("CPU hit! CPU attacks again."),o.gameBoard.areAllShipsSunk())return void u(n);setTimeout(c,1e3)}else r.updateMessage("CPU missed! Your turn."),r.enableBoardInteraction(!0)},u=e=>{r.updateMessage(`${e.name} wins!`),r.enableBoardInteraction(!1)};return{init:d,resetGame:()=>{r.playButton.addEventListener("click",d),r.rerollButton.addEventListener("click",(()=>{o.gameBoard=new e,i(o),r.renderBoard(o.gameBoard.board,r.playerBoardElement)}))}}})();document.addEventListener("DOMContentLoaded",(()=>{o.resetGame(),o.init()}))})();