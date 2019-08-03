const format = require('pg-format');
const { generateProduct } = require('../seedHelpers.js');
const { client } = require('./postgresConnection.js');

const seedPostgres = async () => {
  const tableQueryString = 'CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name TEXT NOT NULL, price TEXT, styles JSON, style_thumbnails JSON)';

  await client.query('TRUNCATE TABLE products RESTART IDENTITY', (err) => {
    if (err) {
      console.log(err);
    }
  });

  await client.query(tableQueryString, (err) => {
    if (err) {
      console.log('ERROR', err);
    }
  });

  const start = `Seeding start: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  console.log(start);
  let count = 0;
  let products = [];
  for (let i = 0; i < 10000000; i += 1) {
    const product = generateProduct();
    const params = [product.name, product.price, product.styles, product.styleThumbnails];
    products.push(params);

    if (products.length === 10000) {
      const formatedString = format('INSERT INTO products (name, price, styles, style_thumbnails) VALUES %L returning id', products);
      count += 10000;
      await client.query(formatedString);
      products = [];
      console.log(count);
    }
  }
  console.log(start, `Seeding finished: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
};

seedPostgres();
