/**
 * @jest-environment jsdom
 */

import "../../src/scripts/load-navbar.js";

import { jest } from "@jest/globals";

const flushPromises = () => new Promise((r) => setTimeout(r, 0));

describe("navbar loader", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="navbar-container"></div>`;
    jest.restoreAllMocks();
  });

  it("fetches navbar.html and injects it", async () => {
    const mockHtml = `<nav><ul><li>Home</li></ul></nav>`;
    global.fetch = jest.fn().mockResolvedValue({
      text: () => Promise.resolve(mockHtml),
    });

    document.dispatchEvent(new Event("DOMContentLoaded"));

    await flushPromises();

    expect(fetch).toHaveBeenCalledWith("../pages/navbar.html");
    expect(document.getElementById("navbar-container").innerHTML).toBe(
      mockHtml,
    );
  });

  it("logs an error if fetch fails", async () => {
    const error = new Error("network down");
    global.fetch = jest.fn().mockRejectedValue(error);
    console.error = jest.fn();

    document.dispatchEvent(new Event("DOMContentLoaded"));
    await flushPromises(); // instead of setImmediate

    expect(console.error).toHaveBeenCalledWith("Navbar failed to load:", error);
  });
});
