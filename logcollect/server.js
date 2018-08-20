require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MetricsService = require('./metricsService');

const port = process.env.LOGCOLLECT_PORT;
const companyToken = process.env.LOGCOLLECT_SECRET_TOKEN; 
const app = express();
let metricsService;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/config', (req, res) => {
  console.log(req.body);

  const rawStorePort = process.env.RAWSTORAGE_PORT;
  const rawStoreAddress = `http://localhost:${rawStorePort}/api/logs`; // raw store address we will get from config request
  metricsService = new MetricsService(rawStoreAddress, companyToken);
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
