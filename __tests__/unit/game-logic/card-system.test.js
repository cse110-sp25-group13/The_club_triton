import { initDB,
   getAllCards,
   getCardById,
   addCardToCollection,
   removeCardFromCollection,
   getOwnedCardIds,
   getOwnedFullCards,
    basePath } from "../../../src/scripts/card-system.js";

describe("Collection management",()=>{
  beforeAll(async()=>{await initDB() });
  test('add card to collection should increase cards',async()=>{
    await addCardToCollection("structure_001",1);
    await addCardToCollection('dining_001',1);
    await addCardToCollection('living_001',1);
    const ownedIds=await getOwnedCardIds();
    expect(ownedIds).toEqual(expect.arrayContaining(["structure_001","dining_001"]));
  });
  test('getOwnedFullCards should return card objects with length = getOwnedCardID',async()=>{
    const ownedCards = await getOwnedFullCards();
    expect(Array.isArray(ownedCards)).toBe(true);
    expect(ownedCards.length).toBe(3);
    for(const card of ownedCards){
      expect(card).toHaveProperty('name');
    }
  });
  test("getCardById returns the correct card", async () => {
    const id = "structure_001";
    const card = await getCardById(id);
    expect(card).toMatchObject({ id, name: expect.any(String) });
  });

  test("getCardById returns the exact card JSON object", async () => {
  const expected = {
    id: "structure_001",
    name: "Geisel Library",
    type: "Structure",
    ranking: 5,
    rarity: 5,
    front_image_placeholder: "/src/assets/imgs/card_faces/geisel_library_front.png",
    back_image_placeholder: "/src/assets/imgs/card_faces/card_back_default.png",
    description: "UCSD's iconic 'spaceship' library, named after Dr. Seuss. A haven for study, housing millions of volumes and campus legends.",
    keywords: ["library", "architecture", "study", "Dr. Seuss", "landmark"]
  };

  const card = await getCardById("structure_001");
  expect(card).toEqual(expected);
  });

  test('Delete card should reduce card count as well as the card obj',async()=>{
    const id="structure_001";
    await removeCardFromCollection(id,1);
    const full = await getOwnedFullCards();
    expect(full.find((c) => c.id === id)).toBeUndefined();

  });
  test("get all cards should return 30",async()=>{
    const deck = await getAllCards();
    expect(deck.length).toBe(30);
  })

});

