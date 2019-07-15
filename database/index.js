const connection = require('./mysqlConnection.js');

const getAllProducts = (callback) => {
  const queryString = 'SELECT * FROM products';
  connection.query(queryString, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

const getProduct = (pid, callback) => {
  const queryString = 'SELECT * FROM products WHERE id=?';
  connection.query(queryString, pid, (err, res) => { // this code is beginning to repeat, should refactor
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

module.exports = { getAllProducts, getProduct };
