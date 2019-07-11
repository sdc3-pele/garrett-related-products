const mysql = require('mysql');
const config = require('./config.js');

const connection = mysql.createPool({
  connectionLimit: 100,
  host: config.port,
  port: 3306,
  user: config.user,
  password: config.password,
  database: 'related_products',
});

const getAllProducts = (callback) => {
  const queryString = 'SELECT * FROM products';
  connection.query(queryString, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, err);
    }
  });
};

module.exports = { getAllProducts };
