const amqp = require('amqplib/callback_api');

const port = process.env.RABBITMQ_EXTERNAL_PORT;
const queue = 'logs';
let logChannel = null;

amqp.connect(`amqp://localhost:${port}`, (err, conn) => {
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