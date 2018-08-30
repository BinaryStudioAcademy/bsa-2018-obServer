const requestHelper = require('./utils/apiRequest');
const httpMiddleware = require('./middleware/http')
const Logger = require('./utils/logger');

class LogConnect {
  constructor(logcollectPort, appId) {
    this.appId = appId;
    
    const logcollectUrl = `http://localhost:${logcollectPort}/api/logs`;
    this.sendLog = requestHelper(logcollectUrl);
  }
  httpStats() {
    return httpMiddleware(this.sendLog, this.appId);
  }
  logger() {
    return new Logger(this.sendLog, this.appId);
  }  
};

module.exports = (logcollectPort, app) => new LogConnect(logcollectPort, app);
