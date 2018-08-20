module.exports = (logType, data, app) => {
  return {
    logType, 
    data,
    timestamp: new Date(),
    app
  }
};