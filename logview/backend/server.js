const
    bodyParser = require('body-parser'),
    express = require('express'),
    apiResponse = require('express-api-response'),
    path = require('path');
    session = require('express-session'),
    sessionSecret = require('./config/session').secret,
    webpack = require('webpack'),
    webpackConfig = require('../webpack.config.js'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    port = 3060;

const app = express();
// console.log(`\n\n${JSON.stringify(webpackConfig)}\n\n\n`);
console.log(`\n\n${webpackConfig.output}\n\n\n`);

// empty arrays don't throw 404 response error
apiResponse.options({
    emptyArrayIsOk: true
});

const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
}

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackHotMiddleware(compiler));
}

app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: false}));

const distPath = path.resolve(__dirname + '/../dist');
const resourcesPath = path.resolve(__dirname + '/../resources');

app.use('/dist', express.static(distPath));
app.use('/resources', express.static(resourcesPath));

const apiRoutes = require('./routes/api/routes')(app);
const viewRoutes = require('./routes/view/routes')(app);

console.log(`Log View app is launched on port ${port}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
const server = app.listen(port);

module.exports = app;