const MAX_RANK = 5;

const TYPES = ["Living", "Dining", "Structure"];

const makeCard = (type, ranking) => ({ type, ranking });

const cards = Object.fromEntries(
  TYPES.flatMap((type) =>
    Array.from({ length: MAX_RANK }, (_, i) => [
      `${type}${i + 1}`,
      makeCard(type, i + 1),
    ]),
  ),
);

export { MAX_RANK, TYPES, cards };
