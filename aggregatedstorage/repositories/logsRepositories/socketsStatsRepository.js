const AppLogGeneralRepository = require('./appLogGeneralRepository');
const SocketStatsModel = require('../../db/models/socketsStats');

class SocketStats extends AppLogGeneralRepository {
  constructor() {
    super(SocketStatsModel);
  }

  create(log, callback) {
    const socketStatsLog = {
      companyId: log.companyToken,
      appId: log.appId,
      timestamp: log.timestamp,
      roomsAmount: log.data.roomsAmount,
      rooms: log.data.rooms
    };

    this.model.create(socketStatsLog, callback);
  }
}

module.exports = new SocketStats();
