const { generateProduct } = require('../seedHelpers.js');
// bring in db connection
const { client } = require('./cassandraConnection.js');

const seedCasandra = async () => {
  // let count = 1;
  const keyspaceQuery = "CREATE KEYSPACE IF NOT EXISTS related_products WITH REPLICATION = { 'class': 'SimpleStrategy' , 'replication_factor': 3 }";
  const truncateTableQuery = 'TRUNCATE related_products.products';
  const createTableQuery = 'CREATE TABLE IF NOT EXISTS related_products.products (id int PRIMARY KEY, name text, price text, styles text, style_thumbnails text)';

  const seedQuery = 'INSERT INTO related_products.products (id, name, price, styles, style_thumbnails) VALUES (?, ?, ?, ?, ?)';

  const queries = [];

  client.execute(keyspaceQuery)
    .then(() => client.execute(keyspaceQuery))
    .then(() => client.execute(truncateTableQuery))
    .then(() => client.execute(createTableQuery))
    .then(async () => {
      const start = `Seeding start: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      console.log(start);
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
        count++;
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

  // await client.execute(keyspaceQuery, (err) => {
  //   if (err) {
  //     console.log('Keyspace not created', err);
  //   } else {
  //     console.log('Keyspace created');
  //   }
  // });

  // await client.execute(truncateTableQuery, (err) => {
  //   if (err) {
  //     console.log('Problem truncating table: ', err.message);
  //   } else {
  //     console.log('Table was truncated');
  //   }
  // });

  // await client.execute(createTableQuery, (err) => {
  //   if (err) {
  //     console.log('Problem creating Table', err);
  //   } else {
  //     console.log('Table created');
  //   }
  // });

  // const start = `Seeding start: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  // console.log(start);
  // var x = 0;
  // while(x < 10) {

  // for (let i = 0; i < 10; i += 1) {
  //   const product = generateProduct();
  //   const params = [i, product.name, product.price, product.styles, product.styleThumbnails];
  //   const one = {
  //     query: seedQuery,
  //     params: params,
  //   };
  //   queries.push(one);
  // }



  //   let query = {
  //     query: seedQuery,
  //     params: params,
  //   };
  //   queries.push(query);
  // }
  // await client.batch(queries, { prepare: true })
  //   .then(() => console.log('SEEEDED'))
  //   .then(() =>   console.log(start, `Seeding finished: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`))
  //   .catch((err) => console.log('Problem seeding table', err))
  // const result = await client.executeConcurrent(client, seedQuery, queries);
  // console.log('&&&&&&', queries.length);
  // client.execute(seedQuery, queries, { prepare: true }, (err) => {
  //   if (err) {
  //     console.log('Problem seeding table', err);
  //   } else {
  //     console.log(count, 'Table seeded');
  //     count += 1;
  //   }
  // });
  // console.log(start, `Seeding finished: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
  // x++;
// }
};

seedCasandra();
