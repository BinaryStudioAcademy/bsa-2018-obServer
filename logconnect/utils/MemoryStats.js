const createLogObject = require('./createLogObject');

class MemoryAppStats {
    constructor(sendLog, appId) {
        this.sendLog = sendLog;
        this.appId = appId;
        this.timers = {};
    }

    calcMemory(callback) {
        const heapTotal = this.toMB(process.memoryUsage().heapTotal);
        const heapUsed = this.toMB(process.memoryUsage().heapUsed);
        callback({ heapTotal, heapUsed });
    }

    toMB(value) {
        return Math.round(value / 1024 / 1024 * 100) / 100;
    }

    startMemoryMonitor(delay = 1000) {
        if (!this.timers.memoryTimedId) {
            this.timers.memoryTimedId = setInterval(() => {
                this.calcMemory(memoryData => {
                    const log = createLogObject('MEMORY_APP', memoryData, this.appId);
                    this.sendLog(log);
                });
            }, delay);
        }
    }

    stopMemoryMonitor() {
        clearInterval(this.timers.memoryTimedId);
        delete this.timers.memoryTimedId;
    }
}

module.exports = MemoryAppStats;