const seed = require('../seed.js');

test('chooses a random item from array', () => {
  expect(seed.chooseRandomly([1, 2, 3])).not.toBeGreaterThan(3);
});
