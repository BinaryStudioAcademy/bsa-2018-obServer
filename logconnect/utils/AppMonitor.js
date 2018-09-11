const createLogObject = require('./createLogObject');

class AppMonitor {
    constructor(sendLog, appId) {
        this.sendLog = sendLog;
        this.appId = appId;
    }

    startAppMonitor() {
        process.prependListener('uncaughtException', (data) => {
            const { message, name, stack } = data;
            const notification = {
                message: `${this.appId} crashed`,
                error: {
                    message,
                    name,
                    stack
                }
            };   
            const log = createLogObject('NOTIFICATION', notification, this.appId);
            this.sendLog(log);
        });
    }
}

module.exports = AppMonitor;
