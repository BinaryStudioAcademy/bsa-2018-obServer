class ServerMonitor {
    constructor(sendLog) {
        this.sendLog = sendLog;
        this.CPUAvg = [];
    }

    checkCriticalCPUValue(cpuData, criticalValue = 10, criticalTime = 10 * 1000) {
        this.CPUAvg.push(cpuData.totalLoad);        
        setTimeout(() => {
            const state = this.CPUAvg.reduce((acc, curr) => acc + curr, 0) / this.CPUAvg.length >= criticalValue;
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