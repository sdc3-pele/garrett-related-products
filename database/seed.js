const vocab = require('./seedVocab.js');
const connection = require('./mysqlConnection.js');

const chooseRandomly = (array) => { // helps us choose random words from vocab
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

const getDescriptors = () => { // grab vocab words from vocab and capitalize them
  const capitalize = (word) => {
    const arr = [...word];
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
  };
  const first = capitalize(chooseRandomly(vocab.firstDescriptor));
  const second = capitalize(chooseRandomly(vocab.secondDescriptor));
  return `${first} ${second}`;
};

const generatePrice = () => `${Math.floor(Math.random() * 200) + 20}.00`; // generates a random price in the range of $20 - $250


const generateProduct = () => { // puts it all together
  const productType = `${chooseRandomly(vocab.clothingType)}`;
  const name = `${getDescriptors()} ${productType}`;
  const price = generatePrice();
  return { name, price };
};

const seedDb = () => {
  const product = generateProduct();
  const params = [ product.name, product.price];
  const queryString = 'INSERT INTO products (name, price) VALUES (?, ?) ';
  connection.query(queryString, params, (err, res) => {
    if (err) {
      console.log('error inserting: ', err);
    } else {
      console.log('success! ', res);
    }
  });
};

// seed with 100 products
let i = 0;
while (i < 100) {
  seedDb();
  i += 1;
}
