const seed = require('../database/seed.js');

test('chooses a random item from array', () => {
  expect(seed.chooseRandomly([1, 2, 3])).not.toBeGreaterThan(3);
});

test('generates urls', () => {
  expect(seed.generateStyle()).toMatch(/https/);
  expect(seed.generateStyleThumbnail()).toMatch(/https/);
});

test('generates a product object of with correct fields', () => {
  const productKeys = Object.keys(seed.generateProduct());
  expect(productKeys.length).toBe(4);
  productKeys.forEach((key) => {
    expect(['name', 'price', 'styles', 'styleThumbnails']).toContain(key);
  });
});
