class ServerMonitor {
    constructor(sendLog) {
        this.sendLog = sendLog;
    }

    checkCriticalCPUValue(cpuData, criticalValue = 90, criticalTime = 10 * 1000) {
        let state = false;
        const cond = cpuData.totalLoad > criticalValue;
        state |= cond;
        setTimeout(() => {
            if (state) {
                console.log('CPU IS OVERLOAD');
                
                const notification = {
                    message: `Server CPU load is critcally high: >${criticalValue}%`,
                    error: {}
                };
                this.sendLog(ServerMonitor.createLogObject('NOTIFICATION', notification));  
            }
        }, criticalTime);
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