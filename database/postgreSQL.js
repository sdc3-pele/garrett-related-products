const { Pool } = require('pg');
const config = require('./config.js');
// Look into client vs pool

// const client = new Client();
// client.connect();

const pool = new Pool(config.postgres);

module.exports = pool;
