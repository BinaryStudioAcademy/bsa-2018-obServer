require('dotenv').config();
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const sockets = require('./sockets/sockets');
const logService = require('./services/logService');

const port = process.env.AGGREGATEDSTORAGE_PORT;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

sockets(io);

const baseUrl = '/api'

app.post(`${baseUrl}/logs`, (req, res) => {
  logService.create(req.body, (err, result) => {
    if(!err) {
      res.send('ok');
    } else {
      console.log(err);
    }
  });
  io.to(req.body.companyToken).emit('logs', req.body);
});

server.listen(port, () => {
  console.log(`Log aggregated store app listening on port ${port}`);
});
