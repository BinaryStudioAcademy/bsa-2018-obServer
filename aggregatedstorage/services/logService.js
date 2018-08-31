const mongoose = require('mongoose');
const logRepository = require('../repositories/logRepository');
const logTypes = require('../utils/logTypes');
const { aggregateLogs, parseLogTypesFromIntervals, parseIntervals } = require('./aggregationService');
const { logNeedRealtimeAggregation, aggregateRealTimeLog } = require('./realTimeAggregationService');

class LogService {
  constructor() {
    this.io = null;
  }

  init(io) {
    this.io = io;
  }

  create(logMessage, callback) {
    if (logNeedRealtimeAggregation(logMessage.logType)) {
      aggregateRealTimeLog(logMessage);
    } else {
      logRepository.create(logMessage, (err, doc) => {
        if (!err) {
          this.io.emit('newLog', doc);      
        } else {
          callback(err);
        }
      });
    }
  }

  getLogsForInterval(companyId, appId, logIntervals, callback) {
    const parsedLogTypes = parseLogTypesFromIntervals(logIntervals, appId);
    const intervals = parseIntervals(logIntervals);
    const aggregatedLogs = {};

    parsedLogTypes.forEach(async (logType, i, arr) => {
      let logs = [];
      try {
        logs = await logRepository.getLogsByCompanyIdAppId(companyId, appId, logType);
      } catch(err) {
        callback(err);
        return;
      }
      const timeIntervalForType = intervals[logType];
      const avgLogsForType = aggregateLogs(logs, timeIntervalForType, logType);
      aggregatedLogs[logTypes.name[logType]] = avgLogsForType;

      if (i === arr.length - 1) callback(null, aggregatedLogs);
    });
  }
} 

module.exports = new LogService();
