const express = require('express'),
	webpack = require('webpack'),
	webpackConfig = require('../webpack.config.js'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackHotMiddleware = require('webpack-hot-middleware'),
	viewRoutes = require('../backend/routes/view/routes'),
	opn = require('opn'),
	port = 3000;

const app = express();
const compiler = webpack(webpackConfig);

app.use(
	webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	})
);
app.use(webpackHotMiddleware(compiler));

viewRoutes(app);

const server = app.listen(port);
server.on('error', err => {
	console.log(err);
});

const { LOGVIEW_HOST, LOGVIEW_PORT, APP_PORT } = process.env;
const port = LOGVIEW_PORT || APP_PORT || 80;
const url = `http://${LOGVIEW_HOST || 'localhost'}:${port}`;

server.on('listening', () => {
	opn(url);
	console.log(`Development server started on port ${port}`);
});

module.exports = app;
