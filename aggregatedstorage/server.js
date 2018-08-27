require('dotenv').config();
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var amqp = require('amqplib/callback_api');
const sockets = require('./sockets/sockets');
const logService = require('./services/logService');

const port = process.env.AGGREGATEDSTORAGE_PORT;
const rabbitmqPort = process.env.RABBITMQ_EXTERNAL_PORT;
const baseUrl = '/api';

sockets(io);

logService.init(io);
logService.configAvgLogs(15000);

amqp.connect(`amqp://localhost:${rabbitmqPort}`, function(err, conn) {
  conn.createChannel(function(err, channel) {
    const queue = 'logs';

    channel.assertQueue(queue, {durable: false});
    channel.consume(queue, function(logMessage) {
      const logObject = JSON.parse(logMessage.content.toString());

      logService.create(logObject, (err, result) => {
        if(err) {
          console.log(err);
        }
      });
    }, {noAck: true});
  });
});

app.get(`${baseUrl}/logs`, (req, res) => {
  const companyId = req.header('X-COMPANY-TOKEN');
  const logIntervals = req.query;
  let appId = req.header('X-APP-ID') || null;

  logService.getLogsForInterval(companyId, appId, logIntervals, (err, logs) => {
    if (!err) {
      res.send(logs);
    }
  });
});

server.listen(port, () => {
  console.log(`Log aggregated store app listening on port ${port}`);
});
