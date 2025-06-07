/**
 * @jest-environment jsdom
 */

import { jest } from "@jest/globals";

describe("Rules projector functionality", () => {
  beforeEach(async () => {
    document.body.innerHTML = `
      <div class="projector-slot">
        <div id="projector-screen">
          <div class="screen-handle"></div>
          <div class="screen-content">
            <div class="slide active"></div>
            <div class="slide"></div>
            <div class="slide"></div>
          </div>
          <div class="screen-controls">
            <button class="nav-btn prev-btn" disabled><img /></button>
            <span class="slide-counter"></span>
            <button class="nav-btn next-btn"><img /></button>
          </div>
        </div>
      </div>
    `;

    jest.resetModules();
    await import("../../src/scripts/game-page-script.js");
    document.dispatchEvent(new Event("DOMContentLoaded"));
  });

  it("shows when screen-handle button is clicked", () => {
    const handle = document.querySelector(".screen-handle");
    const screen = document.getElementById("projector-screen");
    const counter = document.querySelector(".slide-counter");

    handle.click();
    expect(screen.classList.contains("show")).toBe(true);
    expect(counter.textContent).toBe("1/3");

    handle.click();
    expect(screen.classList.contains("show")).toBe(false);
  });

  it("initializes correctly", () => {
    const slides = document.querySelectorAll(".slide");
    expect(slides[0].classList.contains("active")).toBe(true);
    expect(document.querySelector(".prev-btn").disabled).toBe(true);
    expect(document.querySelector(".slide-counter").textContent).toBe("1/3");
  });

  it("clicks next -> next -> prev", () => {
    const prev = document.querySelector(".prev-btn");
    const next = document.querySelector(".next-btn");
    const counter = document.querySelector(".slide-counter");

    expect(prev.disabled).toBe(true);
    expect(next.disabled).toBe(false);

    next.click();
    expect(counter.textContent).toBe("2/3");
    expect(prev.disabled).toBe(false);
    expect(next.disabled).toBe(false);

    next.click();
    expect(counter.textContent).toBe("3/3");
    expect(prev.disabled).toBe(false);
    expect(next.disabled).toBe(true);

    prev.click();
    expect(counter.textContent).toBe("2/3");
    expect(prev.disabled).toBe(false);
    expect(next.disabled).toBe(false);
  });
});
