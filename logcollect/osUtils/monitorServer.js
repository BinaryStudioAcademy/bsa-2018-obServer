class ServerMonitor {
    constructor(sendLog, cpuLoadCriticalValue, cpuLoadCriticalTime) {
        this.sendLog = sendLog;
        this.cpuLoadCriticalValue = cpuLoadCriticalValue;
        this.cpuLoadCriticalTime = cpuLoadCriticalTime;
        this.enabled = true;
        this.totalCpuLoad = 0;
        this.counter = 0;
        this.timer = setInterval(() => {
          this.checkCriticalCpuValue();
        }, this.cpuLoadCriticalTime);
    }

    newCpuData(cpuData) {
        this.totalCpuLoad += cpuData.totalLoad;
        this.counter++;   
    }

    checkCriticalCpuValue() {
      if (this.counter === 0) return;

      if (Math.round(this.totalCpuLoad / this.counter) > this.cpuLoadCriticalValue && this.enabled) {
        const notification = {
          message: `Server CPU load is critcally high: >${this.cpuLoadCriticalValue}%`,
          error: {}
        };
        this.sendLog(ServerMonitor.createLogObject('NOTIFICATION', notification), '/logs');
      }

      this.totalCpuLoad = 0;
      this.counter = 0;
    }

    enableMonitorServer(isEnabled = false) {
      this.enabled = isEnabled;
    }

    disableMonitorServer() {
      this.enabled = false;
    }

    static createLogObject(logType, data) {
        return {
            logType: logType,
            data: data,
            timestamp: new Date(),
        };
    }
}

module.exports = ServerMonitor; 