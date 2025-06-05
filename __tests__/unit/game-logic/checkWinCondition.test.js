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
  let capturedAlertMsg;

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
        </div>
      </div>
    `;
    TYPES.forEach((t) => {
      playerScore[t] = 0;
      aiScore[t] = 0;
    });

    global.confetti = jest.fn();
  });

  it("does not pop up when no one meets a win condition", () => {
    checkWinCondition();

    const modalElement = document.getElementById("gameModal");
    expect(modalElement.classList.contains("show")).toBe(false);
  });

  it("pops up when player wins with one of each type", () => {
    TYPES.forEach((t) => {
      playerScore[t] = 1;
    });

    checkWinCondition();

    const modalElement = document.getElementById("gameModal");
    expect(modalElement.classList.contains("show")).toBe(true);

    const modalTitle = document.getElementById("modalTitle");
    expect(modalTitle.textContent).toBe("🎉 You Win!");
  });

  it("pops up when player wins with three of same type", () => {
    playerScore.Living = 3;

    checkWinCondition();

    const modalElement = document.getElementById("gameModal");
    expect(modalElement.classList.contains("show")).toBe(true);

    const modalTitle = document.getElementById("modalTitle");
    expect(modalTitle.textContent).toBe("🎉 You Win!");
  });

  it("pops up when ai wins with one of each type", () => {
    TYPES.forEach((t) => {
      aiScore[t] = 1;
    });

    checkWinCondition();

    const modalElement = document.getElementById("gameModal");
    expect(modalElement.classList.contains("show")).toBe(true);

    const modalTitle = document.getElementById("modalTitle");
    expect(modalTitle.textContent).toBe("😞 You Lose Bozo!");
  });

  it("alerts when ai wins with three of same type", () => {
    aiScore.Dining = 3;

    checkWinCondition();

    const modalElement = document.getElementById("gameModal");
    expect(modalElement.classList.contains("show")).toBe(true);

    const modalTitle = document.getElementById("modalTitle");
    expect(modalTitle.textContent).toBe("😞 You Lose Bozo!");
  });

  it("alerts when player wins - player takes precedence when both meet conditions", () => {
    playerScore.Living = 1;
    playerScore.Dining = 1;
    playerScore.Structure = 1;

    aiScore.Living = 3;

    checkWinCondition();

    const modalElement = document.getElementById("gameModal");
    expect(modalElement.classList.contains("show")).toBe(true);

    const modalTitle = document.getElementById("modalTitle");
    expect(modalTitle.textContent).toBe("🎉 You Win!");
  });
});
