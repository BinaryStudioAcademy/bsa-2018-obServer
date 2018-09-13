const observer = require('observer-bsa')(3100, '');
const app = require('express')();

const port = 3051;

app.use(observer.httpStats());

observer.logger().info('app2 started');

app.get('/quick', (req, res) => {
  res.send('ok');
});

app.get('/slow', (req, res) => {
  for (let i = 0; i < 1e7; i++) {};
  res.send('ok');
});

app.listen(port, () => {
  console.log(`app2 listening on port ${port}`);
});
