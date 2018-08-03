const bodyParser = require("body-parser"),
  express = require("express"),
  apiResponse = require("express-api-response"),
  path = require("path"),
  session = require("express-session"),
  sessionSecret = require("./config/session").secret,
  webpack = require("webpack"),
  webpackConfig = require("../webpack.config.js"),
  webpackDevMiddleware = require("webpack-dev-middleware"),
  webpackHotMiddleware = require("webpack-hot-middleware"),
  PORT = 3060;

const app = express();
const compiler = webpack(webpackConfig);
const distPath = path.resolve(__dirname + "/../dist");
const resourcesPath = path.resolve(__dirname + "/../resources");
const apiRoutes = require("./routes/api/routes")(app);
const viewRoutes = require("./routes/view/routes")(app);

apiResponse.options({
  emptyArrayIsOk: true
});

if (process.env.NODE_ENV !== "production") {
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

app.use(
  session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/dist", express.static(distPath));
app.use("/resources", express.static(resourcesPath));


const server = app.listen(PORT);
server.on("error", (err) => {
  console.log(err);
})
server.on("listening", () => {
  console.log(`Logger server is listening on PORT ${PORT}`);
})

module.exports = app;
