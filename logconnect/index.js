const requestHelper = require('./utils/apiRequest');
const httpMiddleware = require('./middleware/http')
const Logger = require('./utils/logger');
const MemoryStats = require('./utils/MemoryStats');
const CPUStats = require('./utils/CPUStats');

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
  CPUStats() {
    return new CPUStats(this.sendLog, this.appId).startCPUMonitor();
  }
  memoryStats() {
    return new MemoryStats(this.sendLog, this.appId).startMemoryMonitor();
  }
};

module.exports = (logcollectPort, appId) => new LogConnect(logcollectPort, appId);
