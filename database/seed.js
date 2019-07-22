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

const generatePrice = () => `${20 + Math.floor(Math.random() * 200)}.00`; // generates a random price in the range of $20 - $250

const generateStyle = () => {
  const randomKey = Math.floor(Math.random() * 174); // there are 174 style images in the s3 bucket
  return `https://fec-related-products-images.s3.ap-northeast-2.amazonaws.com/styles/_(${randomKey}).jfif`;
};

const generateStyleThumbnail = () => {
  const randomKey = Math.floor(Math.random() * 187); // there are 187 style thumbnail images in the s3 bucket
  return `https://fec-related-products-images.s3.ap-northeast-2.amazonaws.com/style-thumbs/_(${randomKey}).jfif`;
};

const generateProduct = () => { // puts it all together
  const productType = `${chooseRandomly(vocab.clothingType)}`;
  const name = `${getDescriptors()} ${productType}`;
  const price = generatePrice();
  const numStyles = Math.ceil(Math.random() * 10);
  let styles = [];
  let styleThumbnails = [];
  for (let i = 0; i < numStyles; i += 1) {
    styles.push(generateStyle());
    styleThumbnails.push(generateStyleThumbnail());
  }
  styles = JSON.stringify(styles);
  styleThumbnails = JSON.stringify(styleThumbnails);
  return {
    name,
    price,
    styles,
    styleThumbnails,
  };
};

const seedDb = () => {
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

// seed with 100 products
let i = 0;
while (i < 100) {
  seedDb();
  i += 1;
}

module.exports = {
  chooseRandomly,
  getDescriptors,
  generatePrice,
  generateStyle,
  generateStyleThumbnail,
  generateProduct,
};
