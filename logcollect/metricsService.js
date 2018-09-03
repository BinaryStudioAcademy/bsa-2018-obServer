const sendHelper = require('./apiRequest');
const cpuLoad = require('./osUtils/cpu');
const memoryStats = require('./osUtils/memory');
const ServerMonitor = require('./osUtils/monitorServer');
const tcpPing = require('tcp-ping');

module.exports = class MetricsService {
  constructor(url, companyToken) {
    this.timersId = {};
    this.sendMetrics = sendHelper(url, companyToken);
    this.serverMonitor = new ServerMonitor(this.sendMetrics);
  }

  newLog(data) {
    this.sendMetrics(data);
  }

  startCPUMonitor(delay = 1000) {
    if(!this.timersId.cpu) {
      this.timersId.cpu = setInterval(() => {
        cpuLoad((cpuData) => {
          this.sendMetrics(MetricsService.createLogObject('CPU_SERVER', cpuData));
          this.serverMonitor.checkCriticalCPUValue(cpuData);
        });
      }, delay);
    }
  }

  stopCPUMonitor() {
    clearInterval(this.timersId.cpu);
    delete this.timersId.cpu;
  }

  startMemoryMonitor(delay = 1000) {
    if(!this.timersId.memory) {
      this.timersId.memory = setInterval(() => {
        memoryStats((memData) => {
          this.sendMetrics(MetricsService.createLogObject('MEMORY_SERVER', memData));
        });
      }, delay);
    }
  }

  stopMemoryMonitor() {
    clearInterval(timersId.memory);
    delete timersId.memory;
  }

  startServerMonitor() {
    this.ping();
  }

  ping(appPort = 3200, delay = 1000) {
    if(!this.timersId.ping) {
      this.timersId.ping = setInterval(() => {
        tcpPing.ping({port: appPort}, (err, data) => {
          if (err) console.log(err);
          else if (this.checkBadPing(data)) {
            console.log(data);
            const notification = {
              message: 'App ${appId} is down'
            }; 
            this.sendMetrics(MetricsService.createLogObject('NOTIFICATION_SERVER', notification, /* appId */));
          }
        });
      }, delay);
    }
  }

  checkBadPing(data) {
    const { avg, results } = data;
    return isNaN(avg) && results[0].hasOwnProperty('err') ? true : false;
  }

  static createLogObject(logType, data) {
    return {
      logType: logType,
      data: data,
      timestamp: new Date(),
    };
  }
}