const { generateProduct } = require('../seedHelpers.js');
const { client } = require('./cassandraConnection.js');

const seedCasandra = async () => {
  const keyspaceQuery = "CREATE KEYSPACE IF NOT EXISTS related_products WITH REPLICATION = { 'class': 'SimpleStrategy' , 'replication_factor': 3 }";
  const truncateTableQuery = 'TRUNCATE related_products.products';
  const createTableQuery = 'CREATE TABLE IF NOT EXISTS related_products.products (id int PRIMARY KEY, name text, price text, styles text, style_thumbnails text)';

  client.execute(keyspaceQuery)
    .then(() => client.execute(keyspaceQuery))
    .then(() => client.execute(truncateTableQuery))
    .then(() => client.execute(createTableQuery))
    .then(async () => {
      const start = `Seeding start: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      let list = [];
      let count = 1;
      for (let i = 0; i < 10000000; i += 1) {
        const product = generateProduct();
        const params = [count, product.name, product.price, product.styles, product.styleThumbnails];
        const one = {
          query: 'INSERT INTO related_products.products (id, name, price, styles, style_thumbnails) VALUES (?, ?, ?, ?, ?)',
          params: params
        };
        list.push(one);
        count += 1;
        if (list.length === 10) {
          await client.batch(list, { prepare: true })
            .then(() => console.log('Table seeded'))
            .catch(err => console.log('Problem seeding table', err));
          list = [];
          console.log(count);
        }
      }
      console.log(start, `Seeding finished: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
    })
    .catch((err) => console.log(err));
};

seedCasandra();
