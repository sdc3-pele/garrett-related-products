const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/mysql/index.js');
const client = require('../database/postgres/postgresConnection.js');
const {
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../database/postgres/index.js');

const app = express();
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

app.use('/:pid', express.static(`${__dirname}/../dist`));

/* NOT IN USE */
app.get('/api/products', (req, res) => {
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
});

app.post('/api/product/', (req, res) => {
  const product = req.body;
  product.styles = JSON.stringify(product.styles);
  product.style_thumbnails = JSON.stringify(product.style_thumbnails);

  postProduct(product)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});

app.delete('/api/product/:pid', (req, res) => {
  const { pid } = req.params;

  deleteProduct(pid)
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(500));
});

app.put('/api/product/:pid', (req, res) => {
  const { pid } = req.params;
  const product = req.body;
  product.styles = JSON.stringify(product.styles);
  product.style_thumbnails = JSON.stringify(product.style_thumbnails);

  updateProduct(pid, product)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.listen('3003', () => {
  console.log('listening on port 3003!');
});
