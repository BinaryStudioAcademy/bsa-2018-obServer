const express = require('express');
const io = require('socket.io-client');
var free = require("free-memory");
const obServer = require('../logconnect')(3070, '15c5b8e4-d107-4a27-8773-6cb7a2a6130e');

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

setTimeout(() => {
  obServer.logger().info('Logcollect service listening on port 3070');
}, 3000);
setTimeout(() => {
  obServer.logger().info('Log raw store app listening on port 3080');
}, 6000);
setTimeout(() => {
  obServer.logger().info('Log aggregated store app listening on port 3100');
}, 8000);
setTimeout(() => {
  obServer.logger().info('raw storage db connected');
}, 13000);
setTimeout(() => {
  obServer.logger().info('rabbit connection ok');
}, 18000);
setTimeout(() => {
  obServer.logger().info('aggregated storage db connected');
}, 26000);
setTimeout(() => {
  obServer.logger().verbose('Please select the app');
}, 29000);
setTimeout(() => {
  obServer.logger().debug('Executing (default): SELECT 1+1 AS result');
}, 39000);
setTimeout(() => {
  obServer.logger().silly('Executing (default): CREATE TABLE IF NOT EXISTS "Users"');
}, 42000);
setTimeout(() => {
  obServer.logger().debug('Executing (default): SELECT i.relname AS name');
}, 45000);
setTimeout(() => {
  obServer.logger().silly('Executing (default): CREATE TABLE IF NOT EXISTS "Companies"');
}, 48000);
setTimeout(() => {
  obServer.logger().silly('Executing (default): CREATE TABLE IF NOT EXISTS "Settings"');
}, 51000);
setTimeout(() => {
  obServer.logger().debug('Executing (default): SELECT "id", "name", "companyId", "port", "createdAt", "updatedAt" FROM "Apps" AS "App" WHERE "App"."companyId"');
}, 54000);
setTimeout(() => {
  obServer.logger().error('myApp2 is down');
}, 57000);

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