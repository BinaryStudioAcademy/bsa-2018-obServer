const createLogObject = require('./createLogObject');
const monitor = require('socket.io-monitor');

class SocketStats {
    constructor(io, sendLog, appId) {
        this.sendLog = sendLog;
        this.appId = appId;
        this.timers = {};
        this.emitter = monitor.bind(this.io).emitter;
    }

    async calcRoomsAmount(callback) { 
        const state = await this.emitter.getState();
        const socketStats = {
            roomsAmount: state.rooms.length,
            rooms: []
        };
        state.rooms.forEach(room => {
            socketStats.rooms.push({
                room: room.name,
                clients: room.sockets.length
            });
        });
        callback({ socketStats });
    }

    startSocketMonitor(delay = 1000) {
        if (!this.timers.socketsTimerID) {
            this.timers.socketsTimerID = setInterval(() => {
                this.calcRoomsAmount(socketsData => {           
                    const log = createLogObject('SOCKET_APP', socketsData, this.appId);
                    this.sendLog(log);
                });
            }, delay);
        }
    }

    stopStopMonitor() {
        clearInterval(this.timers.socketsTimerID);
        delete this.timers.socketsTimerID;
    }
}

module.exports = SocketStats;