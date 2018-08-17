const sendHelper = require('./apiRequest');
const cpuLoad = require('./osUtils/cpu');
const memoryStats = require('./osUtils/memory');

module.exports = class MetricsService {
  constructor(url, token) {
    this.timersId = {};
    this.sendMetrics = sendHelper(url, token);
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
          this.sendMetrics(MetricsService.createMetricObject('cpu', cpuData));
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
        this.sendMetrics(MetricsService.createMetricObject('memory', memoryStats()));
      }, delay);
    }
  }

  stopMemoryMonitor() {
    clearInterval(timersId.memory);
    delete timersId.memory;
  }

  static createMetricObject(name, data) {
    return { logType: name, value: data, timestamp: new Date(), serverId: 777 };
  }
}
