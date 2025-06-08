/**
 * @jest-environment jsdom
 */


import { jest } from "@jest/globals";

let resetTimer;
let MAX_TIME;

describe("resetTimer", () => {
  beforeEach(async () => {
    document.body.innerHTML = `<time class="timer"></time>`;
    const mod = await import("../../../src/scripts/script.js");
    resetTimer = mod.resetTimer;
    MAX_TIME = mod.MAX_TIME;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("starts the countdown and updates the display", () => {
    resetTimer();
    const timerEl = document.querySelector(".timer");
    
    expect(timerEl.textContent).toBe(String(MAX_TIME));

    jest.advanceTimersByTime(1000);
    expect(timerEl.textContent).toBe(String(MAX_TIME - 1));

    const pct = timerEl.style.getPropertyValue("--percentage");
    expect(parseFloat(pct)).toBeCloseTo(100 / MAX_TIME);
  });

  it("auto draws after MAX_TIME seconds", () => {
    const spy = jest.spyOn(global, "setTimeout");
    resetTimer();
    expect(spy).toHaveBeenCalledWith(expect.any(Function), MAX_TIME * 1000);
  });
});
