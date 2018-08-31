const AppLogGeneralRepository = require('./appLogGeneralRepository');
const HttpStatsModel = require('../../db/models/httpStats');

class HttpStats extends AppLogGeneralRepository {
  constructor() {
    super(HttpStatsModel);
  }
}

module.exports = new HttpStats();

