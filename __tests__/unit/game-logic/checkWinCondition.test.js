/**
 * @jest-environment jsdom
 */

import {
  playerScore,
  aiScore,
  checkWinCondition,
} from "../../../src/scripts/script.js";

import { TYPES } from "../util.js";

import { jest } from "@jest/globals";

describe("checkWinCondition", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="gameModal" class="popup">
        <div class="popup-content">
          <h2 id="modalTitle">🎉 You Win!</h2>
          <button onclick="location.reload()">Play Again</button>
          <button onclick="window.location.href='home-page.html'">
            Back to Home
          </button>
          <br />
          <button id="closeModal" class="close-button">Close</button>
        </div>
      </div>
    `;

    TYPES.forEach((t) => {
      playerScore[t] = 0;
      aiScore[t] = 0;
    });

    global.confetti = jest.fn();
  });

  it("does not alert when no one meets a win condition", () => {
    checkWinCondition();

    expect(document.getElementById("modalTitle").textContent).toBe(
      "🎉 You Win!",
    );
  });

  it("alerts when player wins with one of each type", () => {
    TYPES.forEach((t) => {
      playerScore[t] = 1;
    });

    checkWinCondition();

    expect(document.getElementById("modalTitle").textContent).toBe(
      "🎉 You Win!",
    );
  });

  it("alerts when player wins with three of same type", () => {
    playerScore.Living = 3;

    checkWinCondition();

    expect(document.getElementById("modalTitle").textContent).toBe(
      "🎉 You Win!",
    );
  });

  it("alerts when ai wins with one of each type", () => {
    TYPES.forEach((t) => {
      aiScore[t] = 1;
    });

    checkWinCondition();

    expect(document.getElementById("modalTitle").textContent).toBe(
      "😞 You Lose Bozo!",
    );
  });

  it("alerts when ai wins with three of same type", () => {
    aiScore.Dining = 3;

    checkWinCondition();

    expect(document.getElementById("modalTitle").textContent).toBe(
      "😞 You Lose Bozo!",
    );
  });

  it("alerts when player wins - player takes precedence when both meet conditions", () => {
    TYPES.forEach((t) => {
      playerScore[t] = 1;
    });

    aiScore.Living = 3;

    checkWinCondition();

    expect(document.getElementById("modalTitle").textContent).toBe(
      "🎉 You Win!",
    );
  });
});
