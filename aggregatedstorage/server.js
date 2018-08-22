require('dotenv').config();
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var amqp = require('amqplib/callback_api');
const sockets = require('./sockets/sockets');
const logService = require('./services/logService');

const port = process.env.AGGREGATEDSTORAGE_PORT;
const rabbitmqPort = process.env.RABBITMQ_EXTERNAL_PORT;

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

server.listen(port, () => {
  console.log(`Log aggregated store app listening on port ${port}`);
});
