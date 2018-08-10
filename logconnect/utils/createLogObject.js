module.exports = (logType, data) => {
  return {
    logType, 
    data,
    timestamp: new Date(),
    serverId: 'testServerID'
  }
};