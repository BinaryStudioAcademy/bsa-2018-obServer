module.exports = (logType, data, appId) => {
  return {
    logType, 
    data,
    timestamp: new Date(),
    appId
  }
};