/**
 * @jest-environment jsdom
 */
import "../../src/card/triton-card.js";

describe("TritonCard", () => {
  let card;

  beforeEach(() => {
    card = document.createElement("triton-card");
    document.body.appendChild(card);
  });

  test("sets name correctly", () => {
    card.name = "Geisel Library";
    const nameEl = card.shadowRoot.querySelector(".name");
    expect(nameEl.textContent).toBe("Geisel Library");
  });

  test("sets rank correctly", () => {
    card.rank = "A";
    const rankEl = card.shadowRoot.querySelector(".rank");
    expect(rankEl.textContent).toBe("A");
  });

  test("sets description correctly", () => {
    card.description = "A beautiful library at UCSD.";
    const descEl = card.shadowRoot.querySelector(".description");
    expect(descEl.textContent).toBe("A beautiful library at UCSD.");
  });

  test("sets rarity correctly", () => {
    card.rarity = 4;
    const rarityEl = card.shadowRoot.querySelector(".rarity");
    expect(rarityEl.textContent).toContain("4");
  });

  test("sets type and updates border color", () => {
    card.type = "structure";
    const typeEl = card.shadowRoot.querySelector(".type");
    expect(typeEl.textContent).toBe("structure");

    const cardInner = card.shadowRoot.querySelector(".card-inner");
    expect(cardInner.style.borderColor).toBe("#003a70");
  });

  test("sets front image src", () => {
    card.front_image = "front.jpg";
    const img = card.shadowRoot.querySelector(".card-front-background img");
    expect(img.src).toContain("front.jpg");
  });

  test("sets back image src", () => {
    card.back_image = "back.jpg";
    const img = card.shadowRoot.querySelector(".card-back-background img");
    expect(img.src).toContain("back.jpg");
  });
});
