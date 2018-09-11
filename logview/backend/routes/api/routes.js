module.exports = app => {
  return {
    userRoutes: require("./userRoutes")(app),
    logRoutes: require("./logRoutes")
  };
};
