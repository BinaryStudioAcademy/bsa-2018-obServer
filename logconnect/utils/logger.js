const createLog = require('./createLogObject');

class Logger {
    constructor(sendLog, app) {        
        this.sendLog = sendLog;
        this.app = app;
    }
    
    error(message) {
        const data = this.createLogBody(0, message);
        this.sendData(data);        
    }

    warn(message) {
        const data = this.createLogBody(1, message);
        this.sendData(data);      
    }

    info(message) {
        const data = this.createLogBody(2, message);
        this.sendData(data);      
    }

    verbose(message) {
        const data = this.createLogBody(3, message);
        this.sendData(data);      
    }

    debug(message) {
        const data = this.createLogBody(4, message);
        this.sendData(data);      
    }

    silly(message) {
        const data = this.createLogBody(5, message);
        this.sendData(data);      
    }

    createLogBody(level, message) {
        const logBody = {
            level: level,
            message: message,
            timestamp: Date.now()
        };
        return logBody;
    }

    sendData(data) {
        const log = createLog('LOG', data, this.app);
        this.sendLog(log);
    }
}

module.exports = Logger;