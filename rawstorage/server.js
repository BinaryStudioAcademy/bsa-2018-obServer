require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logService = require('./services/logService');
const sendHelper = require('./utils/apiRequest');
const Ping = require('./utils/ping');

const app = express();
const port = process.env.RAWSTORAGE_PORT;
const aggrStorePort = process.env.AGGREGATEDSTORAGE_PORT;
const aggregatedStorageUrl = `http://localhost:${aggrStorePort}/api/logs`;
const sendMetrics = sendHelper(aggregatedStorageUrl);
const ping = new Ping();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

const baseUrl = '/api';

app.post(`${baseUrl}/logs`, (req, res) => {
  logService.create({ ...req.body, companyToken: req.header('X-ACCESS-TOKEN') }, (err, logMessage) => {
    if (!err) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  });
});

app.post(`${baseUrl}/ping`, (req, res) => {
  const companyId = req.header('X-ACCESS-TOKEN');
  const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const { port, enabled } = req.body;

  if (enabled) {
    ping.startPing(address, port, companyId);
  } else {
    ping.stopPing(address);
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Log raw store app listening on port ${port}`);
});