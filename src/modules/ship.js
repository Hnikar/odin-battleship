export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
  }
  hit() {
    this.hitCount++;
    if (this.hitCount === this.length) {
      this.isSunk = true;
    }
  }
  isSunk() {
    return this.hitCount === this.length ? true : false;
  }
}
