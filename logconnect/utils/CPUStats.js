const createLogObject = require('./createLogObject');
const pidusage = require('pidusage');

class CPUAppStats {
    constructor(sendLog, appId) {
        this.sendLog = sendLog;
        this.appId = appId;
        this.timers = {};
    }

    calcCPU(callback) {
        pidusage(process.pid, (err, data) => {
            if (err) console.error(err);
            else {                              
                const cpuUsagePercentages  = Math.round(data.cpu * 100) / 100;
                callback({ cpuUsagePercentages });
            }
        });
    }

    startCPUMonitor(delay = 1000) {
        if (!this.timers.CPUTimerId) {
            this.timers.CPUTimerId = setInterval(() => {
                this.calcCPU(CPUData => {
                    const log = createLogObject('CPU_APP', CPUData, this.appId);
                    this.sendLog(log);
                });
            }, delay);
        }
    }

    stopCPUMonitor() {
        clearInterval(this.timers.CPUTimerId);
        delete this.timers.CPUTimerId;
    }
}

module.exports = CPUAppStats;