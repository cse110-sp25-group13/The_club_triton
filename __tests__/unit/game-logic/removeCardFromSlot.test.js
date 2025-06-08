/**
 * @jest-environment jsdom
 */

import { removeCardFromSlot, playerDeckEl } from "../../../src/scripts/script.js";

describe("removeCardFromSlot", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="student-cards">
        <div id="student-card-1"><triton-card id="tritonCard-structure_001"></triton-card></div>
        <div id="student-card-2"><triton-card id="tritonCard-dining_001"></triton-card></div>
      </div>
    `;
    playerDeckEl.length = 0;
    playerDeckEl.push(...document.querySelectorAll(".student-cards div"));
  });

  it("removes the matching triton-card element", () => {
    expect(playerDeckEl[0].querySelector("triton-card")).not.toBeNull();
    removeCardFromSlot("structure_001", playerDeckEl);
    expect(playerDeckEl[0].querySelector("triton-card")).toBeNull();
  });

  it("does nothing if the card is not found", () => {
    expect(() => removeCardFromSlot("living_001", playerDeckEl)).not.toThrow();
  });
});
