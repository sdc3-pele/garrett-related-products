const mysql = require('mysql');

const connection = mysql.createPool({
  connectionLimit: 100,
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'related_products'
})

const seedDb = () => {
  const queryString = 'INSERT INTO products (name) VALUES (?)';
  connection.query(queryString, 'joy', (err, res) => {
    if (err) {
      console.log('error inserting: ', err);
    } else {
      console.log('success! ', res);
    }
  });
};

seedDb();