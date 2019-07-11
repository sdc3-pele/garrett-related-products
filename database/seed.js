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

const generateProduct = () => { // puts it all together
  const productType = `${chooseRandomly(vocab.clothingType)}`;
  return `${getDescriptors()} ${productType}`;
};

const seedDb = () => {
  const queryString = 'INSERT INTO products (name) VALUES (?)';
  connection.query(queryString, generateProduct(), (err, res) => {
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
