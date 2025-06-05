/**
 * @jest-environment jsdom
 */

import {
  playerScore,
  aiScore,
  checkWinCondition,
} from "../../../src/scripts/script.js";

import { TYPES } from "../util.js";

describe("checkWinCondition", () => {
  let originalAlert;

  beforeAll(() => {
    originalAlert = window.alert;
  });

  afterAll(() => {
    window.alert = originalAlert;
  });

  let capturedAlertMsg;

  beforeEach(() => {
    window.alert = (msg) => {
      capturedAlertMsg = msg;
    };

    TYPES.forEach((t) => {
      playerScore[t] = 0;
      aiScore[t] = 0;
    });

    capturedAlertMsg = undefined;
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
