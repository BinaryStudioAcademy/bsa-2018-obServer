const express = require('express');
const io = require('socket.io-client');
var free = require("free-memory");
const obServer = require('../logconnect')(3070, '574ec2cd-51aa-4045-b523-461c21ad1c24');

const app = express();

// const socket = io.connect('http://localhost:3060');

// socket.emit('getLogs', 'secret-company-token', (logs) => {
  // console.log('#######' + JSON.stringify(logs));
// });

// socket.on('newLog', (log) => {
//   console.log(log);
// });

app.use(obServer.httpStats());

// obServer.memoryStats();
// obServer.CPUStats();
// setTimeout(() => {
//   obServer.logger().error('some error');
// }, 3000);
// obServer.appMonitor();

// setTimeout(() => {
//   throw new Error('my error');
// }, 3000);

app.get('/q', (req, res) => {
  res.send('okkkkkkkkkkkkk');
});
app.post('/q', (req, res) => {
  res.send('okkkkkkkkkkkkk');
});
app.delete('/q', (req, res) => {
  res.send('okkkkkkkkkkkkk');
});

app.get('/s', (req, res) => {
  for (let i = 0; i < 1e6; i++) {};
  res.send('ok');
});

app.listen(3200, () => {
  console.log('test server on 3200');
});