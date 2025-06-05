/**
 * @jest-environment jsdom
 */

import {
  updateScore,
  playerScore,
  aiScore,
} from "../../../src/scripts/script.js";

import { TYPES, cards } from "../util.js";

function getDOMScore(side, type) {
  const idType = type === "Dining" ? "dining-hall" : type.toLowerCase();
  const elementId = `${side}-${idType}-card`;
  const scoreElement = document.getElementById(elementId);
  return scoreElement.textContent;
}

function expectScoresMatchDOM(side, scoreObj) {
  TYPES.forEach((type) => {
    expect(getDOMScore(side, type)).toBe(String(scoreObj[type]));
  });
}

describe("updateScore", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section class="won-cards">
        <div class="prof-won-cards">
          <div id="prof-structure-card">0</div>
          <div id="prof-living-card">0</div>
          <div id="prof-dining-hall-card">0</div>
        </div>
        <div class="student-won-cards">
          <div id="student-dining-hall-card">0</div>
          <div id="student-living-card">0</div>
          <div id="student-structure-card">0</div>
        </div>
      </section>
    `;

    TYPES.forEach((t) => {
      playerScore[t] = 0;
      aiScore[t] = 0;
    });
  });

  it("increments playerScore.Structure and updates #student-structure-card", () => {
    expect(playerScore.Structure).toBe(0);

    updateScore("player", cards.Structure5, cards.Living4);

    expect(playerScore.Structure).toBe(1);

    expectScoresMatchDOM("student", playerScore);
    expectScoresMatchDOM("prof", aiScore);
  });

  it("increments aiScore.Living and updates #prof-living-card", () => {
    expect(aiScore.Living).toBe(0);

    updateScore("ai", cards.Dining4, cards.Living4);

    expect(aiScore.Living).toBe(1);

    expectScoresMatchDOM("student", playerScore);
    expectScoresMatchDOM("prof", aiScore);
  });

  it("does no increments or updates in case of tie", () => {
    let originalPlayerScore = { ...playerScore };
    let originalAiScore = { ...aiScore };

    updateScore("tie", cards.Dining4, cards.Dining4);

    expect(playerScore).toEqual(originalPlayerScore);
    expect(aiScore).toEqual(originalAiScore);
    expectScoresMatchDOM("student", playerScore);
    expectScoresMatchDOM("prof", aiScore);
  });
});
