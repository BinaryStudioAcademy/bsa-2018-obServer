const requestHelper = require('./utils/apiRequest');
const httpMiddleware = require('./middleware/http')
const Logger = require('./utils/logger');
const MemoryStats = require('./utils/MemoryStats');
const CPUStats = require('./utils/CPUStats');
const SocketStats = require('./utils/SocketStats');
const AppMonitor = require('./utils/AppMonitor');

class LogConnect {
  constructor(logcollectPort, appId) {
    this.appId = appId;
    
    const logcollectUrl = `http://localhost:${logcollectPort}/api/logs`;
    this.sendLog = requestHelper(logcollectUrl);

    new AppMonitor(this.sendLog, this.appId).startAppMonitor();
    new CPUStats(this.sendLog, this.appId).startCPUMonitor();
    new MemoryStats(this.sendLog, this.appId).startMemoryMonitor();
  }
  
  httpStats() {
    return httpMiddleware(this.sendLog, this.appId);
  }
  logger() {
    return new Logger(this.sendLog, this.appId);
  }  
  socketStats(io) {
    return new SocketStats(io, this.sendLog, this.appId).startSocketMonitor();
  }
};

module.exports = (logcollectPort, appId) => new LogConnect(logcollectPort, appId);
