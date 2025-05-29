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
    const testImageSrc = "test-card-front.png"; // Use a clear test image name
    card.front_image = testImageSrc; // Call setter

    // Ensure we select the correct img element (based on your triton-card.js, front image ID is #img-card-front)
    const imgEl = card.shadowRoot.querySelector("#img-card-front");
    
    // Assertion 1: Ensure we found the img element
    expect(imgEl).not.toBeNull(); 

    // Assertion 2: Check if the img element's src attribute is correctly set to the string we passed in
    // Use getAttribute('src') to get the original set value, not the browser-parsed full URL
    if (imgEl) { // Only proceed with subsequent assertions if imgEl exists
      expect(imgEl.getAttribute('src')).toBe(testImageSrc);
    }
  });

  test("sets back image src", () => {
    const testImageSrc = "test-card-back.png";
    card.back_image = testImageSrc;

    const imgEl = card.shadowRoot.querySelector("#img-card-back");
    expect(imgEl).not.toBeNull();
    if (imgEl) {
      expect(imgEl.getAttribute('src')).toBe(testImageSrc);
    }
  });
});
