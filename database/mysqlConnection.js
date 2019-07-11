const mysql = require('mysql');
const config = require('./config.js');

module.exports = mysql.createPool({
  connectionLimit: 100,
  host: config.port,
  port: 3306,
  user: config.user,
  password: config.password,
  database: 'related_products',
});
