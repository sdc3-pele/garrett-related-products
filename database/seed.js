const mysql = require('mysql');
const vocab = require('./seedVocab.js');

const connection = mysql.createPool({
  connectionLimit: 100,
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'related_products'
});

const chooseRandomly = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

const getDescriptors = () => {
  const capitalize = (word) => {
    let arr = [...word];
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
  };
  const first = capitalize(chooseRandomly(vocab.firstDescriptor));
  const second = capitalize(chooseRandomly(vocab.secondDescriptor));
  return `${first} ${second}`;
};

const generateProduct = () => {
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

let i = 0;
while (i < 100) {
  seedDb();
  i++;
};