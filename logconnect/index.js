const requestHelper = require('./utils/apiRequest');
const httpMiddleware = require('./middleware/http')
const Logger = require('./utils/logger');
const MemoryStats = require('./utils/MemoryStats');
const CPUStats = require('./utils/CPUStats');
const SocketStats = require('./utils/SocketStats');
const AppMonitor = require('./utils/AppMonitor');
const pingInit = require('./utils/pingInit');

class LogConnect {
  constructor(logcollectPort, appId, portForPing) {
    this.appId = appId;
    
    const logcollectUrl = `http://localhost:${logcollectPort}/api/logs`;
    this.sendLog = requestHelper(logcollectUrl);

    pingInit(this.sendLog, appId, portForPing);
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
  socketStats(io) {
    return new SocketStats(io, this.sendLog, this.appId).startSocketMonitor();
  }
  appMonitor() {
    return new AppMonitor(this.sendLog, this.appId).startAppMonitor();
  }
};

module.exports = (logcollectPort, appId) => new LogConnect(logcollectPort, appId);
