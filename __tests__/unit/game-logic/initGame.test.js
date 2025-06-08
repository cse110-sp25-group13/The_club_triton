/**
 * @jest-environment jsdom
 */
import { jest } from "@jest/globals";

describe("initGame", () => {
  let initGame, MAX_CARDS;

  beforeEach(async () => {
    jest.resetModules();

    jest.unstable_mockModule("../../../src/scripts/card-system.js", () => ({
      initDB: jest.fn(),
      getAllCards: jest.fn(),
      getOwnedFullCards: jest.fn(),
    }));

    jest.unstable_mockModule("../../../src/card/triton-card.js", () => ({}));

    document.body.innerHTML = `
      <section class="student-deck">
        <section class="student-cards">
          ${"<div></div>".repeat(5)}
        </section>
      </section>
      <section class="prof-deck">
        <section class="prof-cards">
          ${"<div></div>".repeat(5)}
        </section>
      </section>
      <time class="timer"></time>
    `;

    const mod = await import("../../../src/scripts/script.js");
    initGame = mod.initGame;
    MAX_CARDS = mod.MAX_CARDS;

    jest.clearAllMocks();
  });

  it("deals cards from fallback when owned deck is empty", async () => {
    const allCards = [{ id: "foo" }, { id: "bar" }];
    const cardAPI = await import("../../../src/scripts/card-system.js");
    cardAPI.initDB.mockResolvedValue();
    cardAPI.getOwnedFullCards.mockResolvedValue([]);
    cardAPI.getAllCards.mockResolvedValue(allCards);
    console.warn = jest.fn();

    await initGame();

    expect(console.warn).toHaveBeenCalledWith(
      "No cards in player deck, using all available cards as fallback",
    );

    const studentCount = document.querySelectorAll(
      ".student-cards triton-card",
    ).length;
    const aiCount = document.querySelectorAll(".prof-cards triton-card").length;
    expect(studentCount).toBe(allCards.length);
    expect(aiCount).toBe(allCards.length);
  });

  it("deals cards from owned deck when non-empty", async () => {
    const owned = [{ id: "bar", name: "Bar" }];
    const allCards = [{ id: "bar" }, { id: "foo" }];
    const cardAPI = await import("../../../src/scripts/card-system.js");

    cardAPI.initDB.mockResolvedValue();
    cardAPI.getOwnedFullCards.mockResolvedValue(owned);
    cardAPI.getAllCards.mockResolvedValue(allCards);

    console.log = jest.fn();

    await initGame();

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Using player's selected deck"),
      owned.map((c) => c.name),
    );

    const studentCount = document.querySelectorAll(
      ".student-cards triton-card",
    ).length;
    expect(studentCount).toBe(owned.length);

    const aiCount = document.querySelectorAll(".prof-cards triton-card").length;
    expect(aiCount).toBe(allCards.length);
  });
});
