const observer = require('observer-bsa')(3100, '15c5b8e4-d107-4a27-8773-6cb7a2a6130e');
const app = require('express')();

const port = 3050;

app.use(observer.httpStats());

observer.logger().info('app1 started');

app.get('/quick', (req, res) => {
  res.send('ok');
});

app.get('/slow', (req, res) => {
  for (let i = 0; i < 1e7; i++) {};
  res.send('ok');
});

app.listen(port, () => {
  console.log(`app1 listening on port ${port}`);
});
