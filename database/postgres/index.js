const { client } = require('./postgresConnection.js');
// POST FOR A PRODUCT
const postProduct = async (product) => {
  const postedProduct = await client.query(`INSERT INTO products (name, price, styles, style_thumbnails) VAlUES ('${product.name}', '${product.price}', '${product.styles}', '${product.style_thumbnails}')`);
  return postedProduct;
};
// GET RESPONDS WITH A SPECIFIC PRODUCT
const getProduct = async (id) => {
  const product = await client.query(`SELECT * FROM products WHERE id = ${id}`);
  return product;
};
// PUT UPDATES A SPECIFIC PRODUCT
const updateProduct = async (id, product) => {
  const update = await client.query(`UPDATE products SET name = '${product.name}', price = '${product.price}', styles = '${product.styles}', style_thumbnails = '${product.style_thumbnails}' WHERE id = ${id}`);
  return update;
};
// DELETE DELETES A SPECIFIC PRODUCT
const deleteProduct = async (id) => {
  const deleted = await client.query(`DELETE FROM products WHERE id = ${id}`);
  return deleted;
};

module.exports = {
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
