require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logService = require('./services/logService');

const port = process.env.RAWSTORAGE_PORT;
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

const baseUrl = '/api'

app.post(`${baseUrl}/logs`, (req, res) => {
  logService.create(req.body);
  res.send('ok');
});

app.listen(port, () => {
  console.log(`Log raw store app listening on port ${port}`);
});