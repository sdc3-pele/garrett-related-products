const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
});


client.connect((err) => {
  if (err) {
    console.log('failed to connect to cassandra: ', err);
  } else {
    console.log('connected to Cassandra');
  }
});

module.exports = { client };
