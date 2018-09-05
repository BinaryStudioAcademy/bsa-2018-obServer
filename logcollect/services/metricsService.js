const sendHelper = require('../utils/apiRequest');
const logTypes = require('../utils/logTypes');
const cpuLoad = require('../osUtils/cpu');
const memoryStats = require('../osUtils/memory');
const ServerMonitor = require('../osUtils/monitorServer');
const tcpPing = require('tcp-ping');

module.exports = class MetricsService {
  constructor(url, companyToken) {
    this.timersId = { ping: {} };
    this.sendMetrics = sendHelper(url, companyToken);
    this.serverMonitor = new ServerMonitor(this.sendMetrics);
    this.logSettings = {};
    this.CPULoadCriticalTime = 5000;
    this.CPULoadCriticalValue = 90;    
  }

  newLog(data) {
    if (data.logType === 'PING_INIT') {
      this.ping(data.data.pingPort, data.appId);
    } else if (this.logSettings[data.logType]) {
      this.sendMetrics(data, '/logs');
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
      this.logSettings.notificationServerIsDown = settings.notificationServerIsDown;
      this.logSettings.listeningPorts = settings.listeningPorts;

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

    if (this.logSettings.listeningPorts) {
      this.sendMetrics(
        { port: this.logSettings.listeningPorts, enabled: this.logSettings.notificationServerIsDown },
        '/ping'
      );
    }
  }

  startCPUMonitor(delay = 1000) {
    if(!this.timersId.cpu) {
      this.timersId.cpu = setInterval(() => {
        cpuLoad((cpuData) => {
          this.newLog(MetricsService.createLogObject(logTypes.CPU_SERVER, cpuData));
          this.serverMonitor.checkCriticalCPUValue(cpuData, this.CPULoadCriticalValue, this.CPULoadCriticalTime);          
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

  startServerMonitor() {
    this.ping();
  }

  ping(appPort, appId, delay = 1000) {
    if(!this.timersId.ping[appId]) {
      this.timersId.ping[appId] = setInterval(() => {
        tcpPing.ping({ port: appPort }, (err, data) => {
          if (err) console.log(err);
          else if (this.checkBadPing(data)) {
            const notification = {
              message: `App ${appId} is down`
            }; 
            this.sendMetrics(MetricsService.createLogObject('NOTIFICATION', notification, appId ), '/logs');
            this.stopPing(appId);
          }
        });
      }, delay);
    }
  }

  checkBadPing(data) {
    const { avg, results } = data;
    return isNaN(avg) && results[0].hasOwnProperty('err') ? true : false;
  }

  stopPing(appId) {
    clearInterval(this.timersId.ping[appId]);
    delete this.timersId.ping[appId]; 
  }

  static createLogObject(logType, data, appId) {
    return {
      logType: logType,
      data: data,
      timestamp: new Date(),
      ...(appId && { appId })
    };
  }
}