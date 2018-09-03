const createLogObject = require('./createLogObject');

module.exports = (sendLog, appId, pingPort) => {
  sendLog(createLogObject('PING_INIT', { pingPort }, appId));
};
