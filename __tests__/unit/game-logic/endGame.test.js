/**
 * @jest-environment jsdom
 */

import { endGame } from "../../../src/scripts/script.js";

import { jest } from "@jest/globals";

describe("endGame", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="gameModal" class="popup">
        <h2 id="modalTitle"></h2>
      </div>
    `;
    global.confetti = jest.fn();
  });

  it("shows a win screen and fires confetti for the player", () => {
    endGame("player");
    const modal = document.getElementById("gameModal");
    expect(modal.classList.contains("show")).toBe(true);
    expect(document.getElementById("modalTitle").textContent).toBe(
      "🎉 You Win!",
    );
    expect(confetti).toHaveBeenCalled();
  });

  it("shows a lose screen for the AI win", () => {
    endGame("ai");
    const modal = document.getElementById("gameModal");
    expect(modal.classList.contains("show")).toBe(true);
    expect(document.getElementById("modalTitle").textContent).toBe(
      "😞 You Lose Bozo!",
    );
  });
});
