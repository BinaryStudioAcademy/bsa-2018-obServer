const requestHelper = require('./utils/apiRequest');
const httpMiddleware = require('./middleware/http')

class LogConnect {
  constructor(logcollectPort) {
    this.sendLog = requestHelper(`http://localhost:${logcollectPort}/api/logs`);
  }
  httpStats() {
    return httpMiddleware(this.sendLog);
  }
};

module.exports = logcollectPort => new LogConnect(logcollectPort);
