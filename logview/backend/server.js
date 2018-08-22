require('dotenv').config();
const bodyParser = require('body-parser'),
	express = require('express'),
	apiResponse = require('express-api-response'),
	path = require('path'),
	session = require('express-session'),
	sessionSecret = require('./config/session').secret,
	webpack = require('webpack'),
	webpackConfig = require('../webpack.config.js'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackHotMiddleware = require('webpack-hot-middleware'),
	passport = require('passport'),
	Sequelize = require('sequelize'),
	cors = require('cors'),
	port = process.env.APP_PORT;

const app = express();
const compiler = webpack(webpackConfig);
const distPath = path.resolve(__dirname + '/../dist');
const resourcesPath = path.resolve(__dirname + '/../resources');

const postgresDb = require('./dbconnect/postgres');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({
	db: postgresDb.sequelize,
	checkExpirationInterval: 30 * 60 * 1000,
	expiration: 24 * 60 * 60 * 1000
});

apiResponse.options({
	emptyArrayIsOk: true
});

if (process.env.NODE_ENV !== 'production') {
	app.use(
		webpackDevMiddleware(compiler, {
			noInfo: true,
			publicPath: webpackConfig.output.publicPath,
			watchOptions: {
				poll: 1000
			}
		})
	);
	app.use(webpackHotMiddleware(compiler));
}

app.use(
	session({
		secret: sessionSecret,
		resave: true,
		saveUninitialized: true,
		store: sessionStore
	})
);
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/dist', express.static(distPath));
app.use('/resources', express.static(resourcesPath));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

const apiRoutes = require('./routes/api').init(app);
const viewRoutes = require('./routes/view/routes')(app);

let server = null;

postgresDb.sequelize.sync().then(() => {
	server = app.listen(port, () => {});
	server.on('error', err => {
		console.log(err);
	});
	server.on('listening', () => {
		console.log(`Log View app is launched on port ${port}`);
	});
});

module.exports = app;
