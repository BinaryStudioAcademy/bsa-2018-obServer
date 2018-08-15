const sendHelper = require('./apiRequest');
const cpuLoad = require('./osUtils/cpu');
const memoryStats = require('./osUtils/memory');

module.exports = class MetricsService {
  constructor(url, companyToken, appId = 'serverAppId', appName = 'serverApp') {
    this.timersId = {};
    this.sendMetrics = sendHelper(url, companyToken);
    this.appId = appId;
    this.appName = appName;
  }

  newMetrics(data) {
    if(sendMetrics) {
      this.sendMetrics(data);
    }
  }

  startCPUMonitor(delay = 1000) {
    if(!this.timersId.cpu) {
      this.timersId.cpu = setInterval(() => {
        cpuLoad((cpuData) => {
          this.sendMetrics(MetricsService.createMetricObject('cpuServer', cpuData, this.appId, this.appName));
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
        this.sendMetrics(MetricsService.createMetricObject('memoryServer', memoryStats(), this.appId, this.appName));
      }, delay);
    }
  }

  stopMemoryMonitor() {
    clearInterval(timersId.memory);
    delete timersId.memory;
  }

  static createMetricObject(name, data, appId, appName) {
    return {
      logType: name,
      data: data,
      timestamp: new Date(),
      app: {
        id: appId,
        name: appName
      }
    };
  }
}
