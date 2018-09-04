const tcpPing = require('tcp-ping');
const sendHelper = require('./apiRequest');

class Ping {
    constructor(port) {
        this.port = port;
        this.sendMetrics = sendHelper(url, companyToken);
        this.timersId = {};
    }

    startPing (port, delay = 1000) {
        if(!this.timersId.serverPort) {
          this.timersId.serverPort = setInterval(() => {
            tcpPing.ping({ port: port }, (err, data) => {
              if (err) console.log(err);
              else if (this.checkBadPing(data)) {
                const notification = {
                  message: `Server on ${port} is down`
                }; 
                this.sendMetrics(this.createLogObject('NOTIFICATION_SERVER', notification));
                this.stopPing();
              }
            });
          }, delay);
        }
    }

    stopPing() {
        clearInterval(this.timersId.serverPort);
        delete this.timersId.serverPort;
    }

    checkBadPing(data) {
        const { avg, results } = data;
        return isNaN(avg) && results[0].hasOwnProperty('err') ? true : false;
    }

    static createLogObject(logType, data) {
        return {
          logType: logType,
          data: data,
          timestamp: new Date()
        };
      }
}

module.exports = Ping;