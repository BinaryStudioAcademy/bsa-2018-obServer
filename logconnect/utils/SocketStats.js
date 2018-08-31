const createLogObject = require('./createLogObject');
const monitor = require('socket.io-monitor');

class SocketStats {
    constructor(io, sendLog, appId) {
        this.io = io;
        this.sendLog = sendLog;
        this.appId = appId;
        this.timers = {};
        this.emitter = monitor.bind(this.io).emitter;
        this.time = 0;
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

    middleware() {
        this.io.use((socket, next) => {
            console.log('IN 1 MIDDLEWARE');
            // for (let key in socket) {
            //     console.log(key);
            // }
            next();
        });
    }

    startSocketMonitor(delay = 1000) {
        if (!this.timers.memoryTimedId) {
            this.timers.memoryTimedId = setInterval(() => {
                this.calcRoomsAmount(data => {
                    console.log(data.socketStats.rooms);
                });
            }, delay);
        }
        this.middleware();
    }

    stopStopMonitor() {
        clearInterval(this.timers.memoryTimedId);
        delete this.timers.memoryTimedId;
    }
}

module.exports = SocketStats;