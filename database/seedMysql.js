const { loadAll, generateProduct } = require('./seedHelpers.js');
const connection = require('./mysqlConnection.js');

const seedMysql = () => {
  const product = generateProduct();
  const params = [product.name, product.price, product.styles, product.styleThumbnails];
  const queryString = 'INSERT INTO products (name, price, styles, style_thumbnails) VALUES (?, ?, ?, ?) ';
  connection.query(queryString, params, (err, res) => {
    if (err) {
      console.log('error inserting: ', err);
    } else {
      console.log('success! ', res);
    }
  });
};

loadAll(seedMysql);
