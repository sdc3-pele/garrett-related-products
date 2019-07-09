var mysql = require('mysql');

connection = mysql.createPool({
  connectionLimit: 100,
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'related_products'
});

module.exports = {getAllProducts}