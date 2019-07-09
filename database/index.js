var mysql = require('mysql');

connection = mysql.createPool({
  connectionLimit: 100,
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'related_products'
});

const getAllProducts = (callback) => {
  const queryString = 'SELECT * FROM products';
  connection.query(queryString, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, err);
    }
  })
};

module.exports = {getAllProducts}