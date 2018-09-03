const sendHelper = require('./apiRequest');
const cpuLoad = require('./osUtils/cpu');
const memoryStats = require('./osUtils/memory');
const ServerMonitor = require('./osUtils/monitorServer');

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
    this.serverMonitor.checkServerIsDown();
  }

  static createLogObject(logType, data) {
    return {
      logType: logType,
      data: data,
      timestamp: new Date(),
    };
  }
}