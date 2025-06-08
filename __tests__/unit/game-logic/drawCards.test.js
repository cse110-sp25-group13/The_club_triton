/**
 * @jest-environment jsdom
 */

import { jest } from "@jest/globals";

import {
  drawCards,
  playerDeckEl,
  aiDeckEl,
  typeBeats,
} from "../../../src/scripts/script.js";

describe("drawCards utility", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section class="prof-deck">
        <section class="prof-cards">
          <div id="prof-card-1"></div>
          <div id="prof-card-2"></div>
          <div id="prof-card-3"></div>
          <div id="prof-card-4"></div>
          <div id="prof-card-5"></div>
        </section>
      </section>
      <section class="student-deck">
        <section class="student-cards">
          <div id="student-card-1"></div>
          <div id="student-card-2"></div>
          <div id="student-card-3"></div>
          <div id="student-card-4"></div>
          <div id="student-card-5"></div>
        </section>
      </section>
    `;

    playerDeckEl.length = 0;
    playerDeckEl.push(
      ...document.querySelectorAll(".student-deck .student-cards div"),
    );
    aiDeckEl.length = 0;
    aiDeckEl.push(...document.querySelectorAll(".prof-deck .prof-cards div"));

    jest.clearAllMocks();
  });

  it("draws cards for the player and appends triton-card elements with correct front image", () => {
    const pool = [
      {
        id: "structure_001",
        name: "Geisel Library",
        type: "Structure",
        ranking: 5,
        rarity: 5,
        front_image_placeholder:
          "/src/assets/imgs/card_faces_compressed/geisel_library_front.jpg",
        back_image_placeholder:
          "/src/assets/imgs/card_faces_compressed/card_back_default.png",
        description:
          "UCSD's iconic 'spaceship' library, named after Dr. Seuss. A haven for study, housing millions of volumes and campus legends.",
        keywords: ["library", "architecture", "study", "Dr. Seuss", "landmark"],
      },
      {
        id: "structure_002",
        name: "Price Center",
        type: "Structure",
        ranking: 4,
        rarity: 4,
        front_image_placeholder:
          "/src/assets/imgs/card_faces_compressed/price_center_front.jpg",
        back_image_placeholder:
          "/src/assets/imgs/card_faces_compressed/card_back_default.png",
        description:
          "The bustling heart of campus life, offering diverse food, student org spaces, a bookstore, and a movie theater.",
        keywords: ["student center", "food court", "social hub", "activities"],
      },
    ];
    jest.spyOn(Math, "random").mockReturnValue(0);

    const hand = drawCards(2, false, [...pool]);
    expect(hand).toEqual(pool);

    const card0 = playerDeckEl[0].querySelector("triton-card");
    expect(card0).not.toBeNull();
    expect(card0.id).toBe(`tritonCard-${pool[0].id}`);
    const img0 = card0.shadowRoot.querySelector("#img-card-front");
    expect(img0.getAttribute("src")).toBe(`${pool[0].front_image_placeholder}`);
  });

  it("draws cards for the AI and appends triton-card-ai elements with correct front image", () => {
    const pool = [
      {
        id: "dining_001",
        name: "Pines Dining Hall (Muir)",
        type: "Dining",
        ranking: 4,
        rarity: 3,
        front_image_placeholder:
          "/src/assets/imgs/card_faces_compressed/pines_dining_front.jpg",
        back_image_placeholder:
          "/src/assets/imgs/card_faces_compressed/card_back_default.png",
        description:
          "Muir College's popular dining hall known for its diverse menu, comfy atmosphere, and especially its pasta and deli sandwiches.",
        keywords: ["Muir College", "dining hall", "variety", "comfort food"],
      },
      {
        id: "dining_002",
        name: "Canyon Vista Marketplace (Warren)",
        type: "Dining",
        ranking: 3,
        rarity: 3,
        front_image_placeholder:
          "/src/assets/imgs/card_faces_compressed/canyon_vista_front.jpg",
        back_image_placeholder:
          "/src/assets/imgs/card_faces_compressed/card_back_default.png",
        description:
          "Warren College's go-to spot with a hip vibe, canyon views, grill favorites, and surprisingly good sushi.",
        keywords: ["Warren College", "dining hall", "grill", "sushi", "views"],
      },
    ];
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const hand = drawCards(2, true, [...pool]);
    expect(hand).toEqual([pool[1], pool[0]]);

    const aiCard0 = aiDeckEl[0].querySelector("triton-card");
    expect(aiCard0.id).toBe(`tritonCard-${pool[1].id}-ai`);
    const imgAi0 = aiCard0.shadowRoot.querySelector("#img-card-front");
    expect(imgAi0.getAttribute("src")).toBe(
      `${pool[1].front_image_placeholder}`,
    );
  });

  it("returns an empty hand and warns when the pool is empty", () => {
    console.warn = jest.fn();
    const hand = drawCards(3, false, []);
    expect(hand).toEqual([]);
    expect(console.warn).toHaveBeenCalledWith(
      "No more cards available to draw!",
    );
  });
});

describe("typeBeats mapping", () => {
  it("correctly declares which type beats which", () => {
    expect(typeBeats.Living).toBe("Dining");
    expect(typeBeats.Dining).toBe("Structure");
    expect(typeBeats.Structure).toBe("Living");
  });
});
