const { Client } = require('pg');
const config = require('../config.js');

const client = new Client(config.postgres);

client.connect();

module.exports = { client };
