module.exports = app => {
  return {
    commonRoutes: require("./commonRoutes")(app)
  };
};
