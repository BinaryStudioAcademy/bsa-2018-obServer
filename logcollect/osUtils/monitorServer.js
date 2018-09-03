class ServerMonitor {
    constructor(sendLog) {
        this.sendLog = sendLog;
    }

    checkCriticalCPUValue(cpuData, criticalValue = 90) {
        if (cpuData.totalLoad > criticalValue) {
            const notification = {
                message: `Server CPU load is critcally high: >${criticalValue}%`,
                error: {}
            };
            this.sendLog(ServerMonitor.createLogObject('NOTIFICATION_SERVER', notification));  
        }
    }

    checkServerIsDown() {
        process.prependListener('uncaughtException', (data) => {
            const { message, name, stack } = data; 
            const notification = {
                message: 'Server is down',
                error: {
                    message,
                    name,
                    stack
                }
            }; 
            this.sendLog(ServerMonitor.createLogObject('NOTIFICATION_SERVER', notification));  
        });    
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