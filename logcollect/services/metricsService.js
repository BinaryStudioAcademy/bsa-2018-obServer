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
    this.CPULoadCriticalTime = 180000;
    this.CPULoadCriticalValue = 90;
    this.serverMonitor = new ServerMonitor(this.sendMetrics, this.CPULoadCriticalValue, this.CPULoadCriticalTime);
    this.logSettings = { filterData: {}, apps: {}, company: {} };   
  }

  newLog(data) {
    if (this.logSettings.filterData[data.logType]) {
      this.sendMetrics(data, '/logs');
    }
  }

  newLogSettings(settings) {
    if (settings) {
      this.logSettings = {
        filterData: {
          [logTypes.CPU_SERVER]: settings.filterData.serverCPU,
          [logTypes.MEMORY_SERVER]: settings.filterData.serverMemory,
          [logTypes.CPU_APP]: settings.filterData.appsCPU,
          [logTypes.MEMORY_APP]: settings.filterData.appsMemory,
          [logTypes.HTTP_STATS]: settings.filterData.appsHttp,
          [logTypes.LOG]: settings.filterData.appsErrorLog,
          [logTypes.NOTIFICATION]: settings.filterData.notificationServerIsDown,
          [logTypes.SOCKETS_STATS]: settings.filterData.appsSoket,
          notificationHighCpuLoad: settings.filterData.notificationHighRequest
        },
        apps: settings.apps,
        company: settings.company
      };
      this.startOrStopServerMonitoringServices();
    }
  }

  startOrStopServerMonitoringServices() {
    if (this.logSettings.filterData[logTypes.CPU_SERVER]) {
      this.startCPUMonitor();
    } else {
      this.stopCPUMonitor();
    }

    if (this.logSettings.filterData[logTypes.MEMORY_SERVER]) {
      this.startMemoryMonitor();
    } else {
      this.stopMemoryMonitor();
    }

    if (this.logSettings.company.logcollectPort) {
      setTimeout(() => { // temporary timeout, sending ping settings, need to wait for rawstorage start
        this.sendMetrics(
          { port: this.logSettings.company.logcollectPort, enabled: this.logSettings.filterData[logTypes.NOTIFICATION] },
          '/ping'
        );
      }, 4000);  
    }

    this.logSettings.apps.forEach((app) => {
      if (app.port) {
        this.ping(app.port, app.id, app.name);
      }
    });
    
    this.serverMonitor.enableMonitorServer(this.logSettings.filterData.notificationHighCpuLoad);
  }

  startCPUMonitor(delay = 3000) {
    if(!this.timersId.cpu) {
      this.timersId.cpu = setInterval(() => {
        cpuLoad((cpuData) => {
          this.newLog(MetricsService.createLogObject(logTypes.CPU_SERVER, cpuData));
          this.serverMonitor.newCpuData(cpuData);         
        });
      }, delay);
    }
  }

  stopCPUMonitor() {
    clearInterval(this.timersId.cpu);
    delete this.timersId.cpu;
  }

  startMemoryMonitor(delay = 3000) {
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

  ping(appPort, appId, appName, delay = 2000) {
    let lastStatus = false;
    if(!this.timersId.ping[appId]) {
      this.timersId.ping[appId] = setInterval(() => {
        tcpPing.ping({ port: appPort }, (err, data) => {
          if (err) console.log(err);
          else if (this.checkBadPing(data) && lastStatus) {
            const notification = {
              message: `App ${appName} is down!`
            }; 
            this.newLog(MetricsService.createLogObject('NOTIFICATION', notification, appId ), '/logs');
            lastStatus = false;
          } else if (!this.checkBadPing(data)) {
            lastStatus = true;
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