const tcpPing = require('tcp-ping');
const logService = require('../services/logService');

class Ping {
    constructor() {
        this.timersId = {};
    }

    startPing (address, port, companyId, delay = 1000) {
        if(!this.timersId[address]) {
          this.timersId[address] = setInterval(() => {
            tcpPing.ping({ address: address, port: port }, (err, data) => {
              if (err) console.log(err);
              else if (this.checkBadPing(data)) {
                const ipv4 = address.substr(0, 7) === '::ffff:' ? address.substr(7) : address;
                const notification = {
                  message: `Server on ${ipv4} is down`
                };
                logService.create(Ping.createLogObject('NOTIFICATION_SERVER', notification, companyId), (err) => {
                  if (err) console.log(err);
                }); 
                this.stopPing(address);
              }
            });
          }, delay);
        }
    }

    stopPing(address) {
        clearInterval(this.timersId[address]);
        delete this.timersId[address];
    }

    checkBadPing(data) {
        const { avg, results } = data;
        return isNaN(avg) && results[0].hasOwnProperty('err') ? true : false;
    }

    static createLogObject(logType, data, companyId) {
        return {
          logType,
          data,
          companyToken: companyId,
          timestamp: new Date()
        };
      }
}

module.exports = Ping;