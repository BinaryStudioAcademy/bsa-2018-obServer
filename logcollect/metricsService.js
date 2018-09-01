const sendHelper = require('./apiRequest');
const logTypes = require('./utils/logTypes');
const cpuLoad = require('./osUtils/cpu');
const memoryStats = require('./osUtils/memory');

module.exports = class MetricsService {
  constructor(url, companyToken) {
    this.timersId = {};
    this.sendMetrics = sendHelper(url, companyToken);
    this.logSettings = {};
  }

  newLog(data) {
    if(this.logSettings[data.logType]) {
      this.sendMetrics(data);
    }
  }

  newLogSettings(settings) {
    if (settings) {
      this.logSettings[logTypes.CPU_SERVER] = settings.serverCPU;
      this.logSettings[logTypes.MEMORY_SERVER] = settings.serverMemory;
      this.logSettings[logTypes.CPU_APP] = settings.appsCPU;
      this.logSettings[logTypes.MEMORY_APP] = settings.appsMemory;
      this.logSettings[logTypes.HTTP_STATS] = settings.appsHttp;
      this.logSettings[logTypes.LOG] = settings.appsErrorLog;

      this.startOrStopServerMonitoringServices();
    }
  }

  startOrStopServerMonitoringServices() {
    if (this.logSettings[logTypes.CPU_SERVER]) {
      this.startCPUMonitor();
    } else {
      this.stopCPUMonitor();
    }

    if (this.logSettings[logTypes.MEMORY_SERVER]) {
      this.startMemoryMonitor();
    } else {
      this.stopMemoryMonitor();
    }
  }

  startCPUMonitor(delay = 1000) {
    if(!this.timersId.cpu) {
      this.timersId.cpu = setInterval(() => {
        cpuLoad((cpuData) => {
          this.newLog(MetricsService.createLogObject(logTypes.CPU_SERVER, cpuData));
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
          this.newLog(MetricsService.createLogObject(logTypes.MEMORY_SERVER, memData));
        });
      }, delay);
    }
  }

  stopMemoryMonitor() {
    clearInterval(this.timersId.memory);
    delete this.timersId.memory;
  }

  static createLogObject(logType, data) {
    return {
      logType: logType,
      data: data,
      timestamp: new Date(),
    };
  }
}