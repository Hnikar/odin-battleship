export default class Ship {
  constructor(length) {
    this.length = (length < 1 || length > 4) ? (() => { throw new Error("Invalid ship length"); })() : length;
    this.hitCount = 0;
  }
  hit() { this.hitCount++; }
  isSunk() { return this.hitCount === this.length ? true : false; }
}