const requestHelper = require('./utils/apiRequest');
const httpMiddleware = require('./middleware/http')

class LogConnect {
  constructor(logcollectPort, app) {
    this.app = app;
    
    const logcollectUrl = `http://localhost:${logcollectPort}/api/logs`;
    this.sendLog = requestHelper(logcollectUrl);
  }
  httpStats() {
    return httpMiddleware(this.sendLog, this.app);
  }
};

module.exports = (logcollectPort, app) => new LogConnect(logcollectPort, app);
