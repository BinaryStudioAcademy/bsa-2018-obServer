const express = require('express');
const bodyParser = require('body-parser');
const MetricsService = require('./services/metricsService');
const eventEmitter = require('./events');

module.exports = (logcollectPort, companyId) => {
  const port = logcollectPort;
  const app = express();

  const server = require('http').createServer(app);
  const getSettings = require('./sockets/sockets');

  const rawStorePort = 80;
  const rawStoreAddress = `http://35.234.69.138:${rawStorePort}/api`;
  const metricsService = new MetricsService(rawStoreAddress, companyId);

  const baseUrl = '/api';

  app.use(
    bodyParser.json({
      limit: '5mb'
    })
  );
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

  app.post(`${baseUrl}/logs`, (req, res) => {
    metricsService.newLog(req.body);
    res.send(req.body);
  });

  getSettings(companyId);

  eventEmitter.on('get new settings', settings => {
    metricsService.newLogSettings(settings);
  });

  app.listen(port, () => {
    console.log(`Logcollect service listening on port ${port}`);
  });
}
