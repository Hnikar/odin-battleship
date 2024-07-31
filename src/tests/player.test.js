import Player from "../modules/player";
import Gameboard from "../modules/gameboard";
describe("Player", () => {
  test("should create a player", () => {
    const player = new Player(false, "John");
    expect(player).toBeInstanceOf(Player);
  });
  test("should create a player", () => {
    const player = new Player(true);
    expect(player.name).toBe("CPU");
  });
  test("should create a gameboard", () => {
    const player = new Player(false, "John");
    expect(player.gameBoard).toBeInstanceOf(Gameboard);
  });
});
