const express = require('express');
const db = require('../database/mysql/index.js');
const postgresDB = require('../database/postgres/index.js');
const client = require('../database/postgres/postgresConnection.js');

const app = express();

app.use('/:pid', express.static(`${__dirname}/../dist`));

app.get('/api/products', (req, res) => { // get all products
  db.getAllProducts((err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/api/product/:pid', (req, res) => {
  const { pid } = req.params;

  // /* POSTGRES */
  const query = `SELECT * FROM products WHERE id = ${pid}`;
  client.client.query(query, (err, result) => {
    if (err) {
      console.log(`Error retrieving prorduct ${pid}`);
      res.status(500);
    }
    const data = Object.assign({}, result.rows[0]);
    data.styles = JSON.stringify(data.styles);
    data.style_thumbnails = JSON.stringify(data.style_thumbnails);
    res.send(data);
  });

  /* MYSQL */
  // db.getProduct(pid, (err, result) => {
  //   if (err) {
  //     // res.status(400).send(err);
  //   } else {
  //     console.log('M: RESULT: ', result)
  //     res.status(200).send(result);
  //   }
  // });
});

// build post route
app.post('/api/product/', (req, res) => {
  // take data from req

  // save data to DB

  // if success res with 202 & new product from db

  // if error res with 500
});

// build delete route
app.delete('/api/product/:pid', (req, res) => {
  // query db for product with id

  // delete if product exists res 200

  // res with 500 if there is an error
});

// build put route
app.put('/api/product/:pid', (req, res) => {
  // query to db if product(pid) exists

  // take req.body and update it in db

    // es 200 and send back updated product

  // if there is an err

    // res with 500
});

app.listen('3003', () => {
  console.log('listening on port 3003!');
});
