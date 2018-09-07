require('dotenv').config();
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var amqp = require('amqplib/callback_api');
const sockets = require('./sockets/sockets');
const logService = require('./services/logService');

const { 
  AGGREGATEDSTORAGE_PORT, RABBITMQ_EXTERNAL_PORT, RABBITMQ_HOST
} = process.env;

const port = AGGREGATEDSTORAGE_PORT || 3100;
const rabbitmqPort = RABBITMQ_EXTERNAL_PORT || 5672;
const baseUrl = '/api';

sockets(io);

logService.init(io);

amqp.connect(`amqp://${RABBITMQ_HOST || 'localhost'}:${rabbitmqPort}`, function(err, conn) {
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
    } else {
      res.status(404).send(err);
    }
  });
});

server.listen(port, () => {
  console.log(`Log aggregated store app listening on port ${port}`);
});
