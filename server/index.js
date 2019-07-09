const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../dist'));

app.get('/', (req, res) => {
  res.send('Got a request!');
});

app.listen('3000', () => {
  console.log('listening on port 3000!');
});