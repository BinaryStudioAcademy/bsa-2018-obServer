require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const MetricsService = require("./metricsService");
const eventEmitter = require("./events");

const port = process.env.LOGCOLLECT_PORT;
const companyToken = process.env.LOGCOLLECT_SECRET_TOKEN;
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const sockets = require("./sockets/sockets");

const rawStorePort = process.env.RAWSTORAGE_PORT;
const rawStoreAddress = `http://localhost:${rawStorePort}/api/logs`; // raw store address we will get from config request
const metricsService = new MetricsService(rawStoreAddress, companyToken);

const baseUrl = "/api";

app.use(
  bodyParser.json({
    limit: "5mb"
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

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

sockets(io);

eventEmitter.on("get new settings", settings => {
  console.log("get new settings", settings);
});

app.listen(port, () => {
  console.log(`Logcollect service listening on port ${port}`);
});
