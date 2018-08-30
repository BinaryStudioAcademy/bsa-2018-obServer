const createLogObject = require('./createLogObject');
const usage = require('usage');

class CPUAppStats {
    constructor(sendLog, app) {
        this.sendLog = sendLog;
        this.app = app;
        this.timers = {};
    }

    calcCPU(callback) {
        const { pid } = process;
        usage.lookup(pid, (err, data) => {
            if (err) console.error(err);
            else {
                console.log(data);
                const { cpu } = data;
                callback({ cpu });
            }
        });
    }

    startCPUMonitor(delay = 1000) {
        if (!this.timers.CPUTimerId) {
            this.timers.CPUTimerId = setInterval(() => {
                this.calcCPU(CPUData => {
                    const log = createLogObject('CPU_APP', CPUData, this.app);
                    this.sendLog(log);
                });
            }, delay)
        }
    }

    stopCPUMonitor() {
        clearInterval(this.timers.CPUTimerId);
        delete this.timers.CPUTimerId;
    }
}

module.exports = CPUAppStats;