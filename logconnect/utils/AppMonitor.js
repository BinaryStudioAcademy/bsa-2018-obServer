const createLogObject = require('./createLogObject');

class AppMonitor {
    constructor(sendLog, appId) {
        this.sendLog = sendLog;
        this.appId = appId;
    }

    startAppMonitor() {
        process.on('uncaughtException', (data) => {
            const obj = {
                message: data.message,
                name: data.name,
                stack: data.stack
            };
            const log = createLogObject('NOTIFICATION_APP', obj, this.appId);
            console.log(log);
            //this.sendLog(log);
            console.log(`${this.appId} is crashed`);
        });
    }
}

module.exports = AppMonitor;
