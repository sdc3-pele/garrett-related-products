const express = require('express');
const db = require('../database/index.js');

const app = express();

app.use(express.static(`${__dirname}/../dist`));

app.get('/', (req, res) => {
  res.send('Got a request!');
});

app.get('/products', (req, res) => { // initial route, will be converted to dynamic route on a per product basis
  db.getAllProducts((err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

app.listen('3003', () => {
  console.log('listening on port 3003!');
});
