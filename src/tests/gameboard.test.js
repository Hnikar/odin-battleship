import Gameboard from "../modules/gameboard";

describe("Gameboard", () => {
  test("Gameboard should have a board array", () => {
    let gameboard = new Gameboard();
    expect(gameboard.board).toBeDefined();
  });
});
