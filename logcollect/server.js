require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MetricsService = require('./metricsService');

const port = process.env.LOGCOLLECT_PORT;
const token = process.env.LOGCOLLECT_SECRET_TOKEN; 
const app = express();
let metricsService;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/config', (req, res) => {
  console.log(req.body);

  const rawStoreAddress = 'http://localhost:3080/api/logs'; // need log raw stor
  metricsService = new MetricsService(rawStoreAddress, token);
  metricsService.startCPUMonitor(1000);
  metricsService.startMemoryMonitor(1000);

  res.send(req.body); 
});

app.post('/metrics', (req, res) => {
  metricsService.newMetrics(req.body);
  res.send(req.body); 
});


app.listen(port, () => {
  console.log(`Logcollect service listening on port ${port}`);
});
