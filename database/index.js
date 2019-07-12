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

module.exports = { getAllProducts };
