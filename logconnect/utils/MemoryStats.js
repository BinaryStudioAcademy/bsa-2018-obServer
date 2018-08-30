const createLogObject = require('./createLogObject');

class MemoryAppStats {
    constructor(sendLog, app) {
        this.sendLog = sendLog;
        this.app = app;
        this.timedId = -1;
    }

    calcMemory(callback) {
        const { heapTotal, heapUsed } = process.memoryUsage();
        callback({ heapTotal, heapUsed });
    }

    startMemoryMonitor(delay = 1000) {
        if (!this.timedId) {
            this.timedId = setInterval(() => {
                this.calcMemory(memoryData => {
                    this.sendLog('');
                });
            }, delay)
        }
    }
}

module.exports = new MemoryAppStats();