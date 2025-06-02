/**
 * @jest-environment jsdom
 */

import {
  determineWinner,
  updateScore,
  playerScore,
  aiScore,
  typeBeats,
  drawCards,
  deck,
  playerDeckEl,
  aiDeckEl,
  CARDBACK_PATH,
} from "../src/scripts/script.js";
describe("determineWinner()", () => {
  const makeCard = (type, ranking) => ({ type, ranking });
  test("same type + different rank", () => {
    const a = makeCard("monument", 2);
    const b = makeCard("monument", 4);
    expect(determineWinner(a, b)).toBe("player");
  });
  test("diffent type", () => {
    const a = makeCard("monument", 2);
    const b = makeCard("stucture", 3);
    expect(determineWinner(a, b)).toBe("ai");
  });
});
