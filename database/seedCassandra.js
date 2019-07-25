const { loadAll, generateProduct } = require('./seedHelpers.js');
// bring in db connection

const seedCasandra = () => {
  const product = generateProduct();
  console.log(product);
};

loadAll(seedCasandra);
