const express = require('express');
const db = require('../database/index.js');

const app = express();

app.use('/:pid', express.static(`${__dirname}/../dist`));

app.get('/api/:productId', (req, res) => {
  res.send('Got a request for a product!');
});

app.get('/api/products', (req, res) => { // get all products
  db.getAllProducts((err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/api/:pid', (req, res) => {
  const { pid } = req.params;
  db.getProduct((err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.listen('3003', () => {
  console.log('listening on port 3003!');
});
