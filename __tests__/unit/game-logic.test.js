/**
 * @jest-environment jsdom
 */

import {
  determineWinner,
  updateScore,
  checkWinCondition
} from "../../src/scripts/script.js";

const MAX_RANK = 5;

const makeCard = (type, ranking) => ({ type, ranking });

const deck = (() => {
  const types = ["Living", "Dining", "Structure"];
  return types
    .flatMap((type) =>
      Array.from({ length: MAX_RANK }, (_, i) => [
        `${type}${i + 1}`,
        makeCard(type, i + 1),
      ]),
    )
    .reduce((deck, [type, card]) => {
      deck[type] = card;
      return deck;
    }, {});
})();

describe("test determineWinner()", () => {
  test("same type, same rank", () => {
    expect(determineWinner(deck.Living2, deck.Living2)).toBe("tie");
  });

  test("same type, different rank", () => {
    expect(determineWinner(deck.Dining1, deck.Dining3)).toBe("ai");
  });

  test("different type, same rank", () => {
    expect(determineWinner(deck.Structure3, deck.Dining3)).toBe("ai");
  });

  test("different type, different rank", () => {
    expect(determineWinner(deck.Structure5, deck.Living4)).toBe("player");
  });
});

describe("test updateScore()", () => {

});

describe("test checkWinCondition()", () => {

});
