export const randomPositionMeetingCondition = (bounds, condition) => {
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const pos = bounds.randomPointWithin;

    if (condition(pos)) {
      return pos;
    }
    attempts++;
  }
  return null;
};

export const tryToPlaceWithinBounds = (
  bounds,
  tilemap,
  condition,
  factoryFunction,
  amount = 1
) => {
  for (let i = 0; i < amount; i++) {
    const pos = randomPositionMeetingCondition(bounds, (pos) => {
      return condition(bounds, pos, tilemap);
    });
    if (pos != null) {
      factoryFunction(pos, tilemap);
    }
  }
};
