require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logService = require('./services/logService');
const sendHelper = require('./utils/apiRequest');

const app = express();
const port = process.env.RAWSTORAGE_PORT;
const aggrStorePort = process.env.AGGREGATEDSTORAGE_PORT;
const aggregatedStorageUrl = `http://localhost:${aggrStorePort}/api/logs`;
const sendMetrics = sendHelper(aggregatedStorageUrl);

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

const baseUrl = '/api'

app.post(`${baseUrl}/logs`, (req, res) => {
  logService.create(req.body, (err, logMessage) => {
    if (!err) {
      const { logType, data, timestamp, serverId } = logMessage;
      // sendMetrics({ logType, data, timestamp, serverId });      
      res.status(200);
    } else {
      res.status(400).end();
    }
  });

  res.send('ok');
});

app.listen(port, () => {
  console.log(`Log raw store app listening on port ${port}`);
});