const amqp = require('amqplib/callback_api');

const queue = 'logs';
let logChannel = null;
const { RABBITMQ_HOST, RABBITMQ_EXTERNAL_PORT } = process.env;
const port = RABBITMQ_EXTERNAL_PORT || 5672;
const host = RABBITMQ_HOST || 'localhost';;
const connectionString = `amqp://${host}:${port}`;
console.log(`connectionString to rabbitmq: ${connectionString}`);
amqp.connect(connectionString, (err, conn) => {
  if(err) {
    console.log('rabbit connection error' + err);
  } else {
    console.log('rabbit connection ok');
    conn.createChannel((err, channel) => {
      channel.assertQueue(queue, {durable: false});
      logChannel = channel;
    });
  }
});

module.exports = (message) => {
  if(logChannel) {
    logChannel.sendToQueue(queue, Buffer.from(message));
  }
};