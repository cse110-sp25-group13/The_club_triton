import { determineWinner } from "../../../src/scripts/script.js";

import { cards } from "../util.js";

describe("determineWinner", () => {
  it("ties if same type, same rank", () => {
    expect(determineWinner(cards.Living2, cards.Living2)).toBe("tie");
  });

  it("same type, different rank", () => {
    expect(determineWinner(cards.Dining1, cards.Dining3)).toBe("ai");
  });

  it("different type, same rank", () => {
    expect(determineWinner(cards.Structure3, cards.Dining3)).toBe("ai");
  });

  it("different type, different rank", () => {
    expect(determineWinner(cards.Structure5, cards.Living4)).toBe("player");
  });
});
