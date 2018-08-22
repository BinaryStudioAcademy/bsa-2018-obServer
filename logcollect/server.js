require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MetricsService = require('./metricsService');

const port = process.env.LOGCOLLECT_PORT;
const companyToken = process.env.COMPANY_TOKEN; 
const app = express();

const rawStorePort = process.env.RAWSTORAGE_PORT;
const rawStoreAddress = `http://localhost:${rawStorePort}/api/logs`; // raw store address we will get from config request
const metricsService = new MetricsService(rawStoreAddress, companyToken);

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

const baseUrl = '/api';

app.post(`${baseUrl}/config`, (req, res) => {
  console.log(req.body);

  metricsService.startCPUMonitor(3000);
  metricsService.startMemoryMonitor(3000);

  res.send(req.body); 
});

app.post(`${baseUrl}/logs`, (req, res) => {
  metricsService.newLog(req.body);
  res.send(req.body); 
});


app.listen(port, () => {
  console.log(`Logcollect service listening on port ${port}`);
});
