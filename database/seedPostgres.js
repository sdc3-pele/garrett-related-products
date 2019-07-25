const { loadAll, generateProduct } = require('./seedHelpers.js');
// bring in db connection

const seedPostgres = () => {
  const product = generateProduct();
  console.log(product);
  //
};

loadAll(seedPostgres);
