import Player from "../modules/player";
import Gameboard from "../modules/gameboard";
describe("Player", () => {
  test("should create a player", () => {
    const player = new Player(false, "John");
    expect(player).toBeInstanceOf(Player);
  });
  test("should create a CPU player", () => {
    const player = new Player(true);
    expect(player.name).toBe("CPU");
  });
  test("should have a non empty name", () => {
    expect(() => new Player(false, "")).toThrow("Invalid player name");
  });
  test("should have a name of maximum 10 characters", () => {
    expect(() => new Player(false, "JohnDoe123456789")).toThrow(
      "Invalid player name"
    );
  });
  test("should create a gameboard", () => {
    const player = new Player(false, "John");
    expect(player.gameBoard).toBeInstanceOf(Gameboard);
  });
});
