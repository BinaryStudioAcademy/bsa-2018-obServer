const requestHelper = require('./utils/apiRequest');
const httpMiddleware = require('./middleware/http')
const Logger = require('./utils/logger');

class LogConnect {
  constructor(logcollectPort, app) {
    this.app = app;
    
    const logcollectUrl = `http://localhost:${logcollectPort}/api/logs`;
    this.sendLog = requestHelper(logcollectUrl);
  }
  httpStats() {
    return httpMiddleware(this.sendLog, this.app);
  }
  logger() {
    return new Logger(this.sendLog, this.app);
  }  
};

module.exports = (logcollectPort, app) => new LogConnect(logcollectPort, app);
