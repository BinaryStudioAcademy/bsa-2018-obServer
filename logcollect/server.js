require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.LOGCOLLECT_PORT;
const app = express();
const rowStoreAddress = 'http://localhost:3080'; // need log row store
const sendMetric = require('./apiRequest')(rowStoreAddress);

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/config', (req, res) => {
  console.log(req.body);
  res.send(req.body); 
});

app.post('/metrics', (req, res) => {
  sendMetric(req.body);
  res.send(req.body); 
});

app.listen(port, () => {
  console.log(`Logcollect service listening on port ${port}`);
});
