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

  it("does not alert when no one meets a win condition", () => {
    const result = checkWinCondition();
    expect(result).toBeUndefined();

    expect(capturedAlertMsg).toBeUndefined();
  });

  it("alerts when player wins with one of each type", () => {
    TYPES.forEach((t) => {
      playerScore[t] = 1;
    });

    checkWinCondition();

    expect(capturedAlertMsg).toBe("You win! Game over.");
  });

  it("alerts when player wins with three of same type", () => {
    playerScore.Living = 3;

    checkWinCondition();

    expect(capturedAlertMsg).toBe("You win! Game over.");
  });

  it("alerts when ai wins with one of each type", () => {
    aiScore.Living = 1;
    aiScore.Dining = 1;
    aiScore.Structure = 1;

    checkWinCondition();

    expect(capturedAlertMsg).toBe("AI wins! Game over.");
  });

  it("alerts when ai wins with three of same type then alert", () => {
    aiScore.Dining = 3;

    checkWinCondition();

    expect(capturedAlertMsg).toBe("AI wins! Game over.");
  });

  it("alerts when player wins - player takes precedence when both meet conditions", () => {
    playerScore.Living = 1;
    playerScore.Dining = 1;
    playerScore.Structure = 1;

    aiScore.Living = 3;

    checkWinCondition();

    expect(capturedAlertMsg).toBe("You win! Game over.");
  });
});
