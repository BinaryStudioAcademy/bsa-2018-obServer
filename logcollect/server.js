require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const metricsService = require('./metricsService');

const port = process.env.LOGCOLLECT_PORT;
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/config', (req, res) => {
  console.log(req.body);

  const rawStoreAddress = 'http://localhost:3080'; // need log raw stor
  metricsService.init(rawStoreAddress);
  metricsService.startCPUMonitor(1000);

  res.send(req.body); 
});

app.post('/metrics', (req, res) => {
  metricsService.newMetrics(req.body);
  res.send(req.body); 
});


app.listen(port, () => {
  console.log(`Logcollect service listening on port ${port}`);
});
