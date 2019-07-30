const { Pool, Client } = require('pg');
const config = require('../config.js');
// Look into client vs pool

// const client = new Client();
// client.connect();
console.log('config postgress', config.postgres);

// const pool = new Pool(config.postgres);
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

const client = new Client(config.postgres);

// const tableQueryString = 'CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name TEXT NOT NULL, price TEXT, styles JSON, style_thumbnails JSON)';

client.connect();

// client.query('TRUNCATE TABLE products RESTART IDENTITY', (err, res) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(res);
// });


// client.query(tableQueryString, (err, res) => {
//   if (err) {
//     console.log('ERRROR', err);
//   }
// });

module.exports = { client };
