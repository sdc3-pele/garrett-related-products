const mysql = require('mysql');
const config = require('./config.js');

module.exports = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  port: 3306,
  user: config.mysql.user,
  password: config.mysql.password,
  database: 'related_products',
});
