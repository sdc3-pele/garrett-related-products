const seed = require('../database/seed.js');

test('chooses a random item from array', () => {
  expect(seed.chooseRandomly([1, 2, 3])).not.toBeGreaterThan(3);
});

test('generates a random price between $20 and $220', () => {
  const price = Number([...(seed.generatePrice())].slice(1, -3).join(''));
  expect(price).toBeGreaterThanOrEqual(20);
  expect(price).toBeLessThanOrEqual(220);
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
