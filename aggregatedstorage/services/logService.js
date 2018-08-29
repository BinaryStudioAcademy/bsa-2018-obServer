const mongoose = require('mongoose');
const logRepository = require('../repositories/logRepository');
const logTypes = require('../utils/logTypes');
const { aggregateLogs, parseLogTypesFromIntervals, parseIntervals } = require('./aggregationService');

const aggregatedLogs = new Map();

class LogService {
  constructor() {
    this.io = null;
    this.saveAvgLogsTimer = null;
  }

  init(io) {
    this.io = io;
  }

  create(logMessage, callback) {
    if (logNeedAggregation(logMessage.logType)) {
      aggregateLogMessage(logMessage);
    } else {
      logMessage._id = mongoose.Types.ObjectId();
      if (logMessage.logType === logTypes.HTTP_AVG) {
        logMessage.logType = logTypes.HTTP_STATS;
      }
      logRepository.create(logMessage, callback);
      this.io.emit('newLog', logMessage);      
    }
  }

  getLogsByCompanyId(id, callback) {
    logRepository.getByCompanyId(id, callback);
  }

  getLogsByCompanyByDaysFromNow(id, daysCount, callback) {
    let fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysCount);

    logRepository.getByCompanyIdByDaysFromNow(id, fromDate, callback);
  }

  getLogsForInterval(companyId, appId, logIntervals, callback) {
    const appLogTypes = parseLogTypesFromIntervals(logIntervals, true, appId);
    const serverLogTypes = parseLogTypesFromIntervals(logIntervals, false);
    const intervals = parseIntervals(logIntervals);

    logRepository.getAllByCompanyIdAppId(companyId, appId, serverLogTypes, appLogTypes, (err, logs) => {
      if (err) {
        callback(err);
        return;
      }
      
      const aggregatedLogs = {};

      serverLogTypes.forEach((logName) => {
        const logsForType = logs[0].serverData[logTypes.name[logName]];
        const intervalForType = intervals[logName];
        const avgLogsForType = aggregateLogs(logsForType, intervalForType, logName);
        aggregatedLogs[logTypes.name[logName]] = avgLogsForType;
      });

      appLogTypes.forEach((logName) => {
        const logsForType = logs[0].appsData[0].logs[logTypes.name[logName]];
        const intervalForType = intervals[logName];
        const avgLogsForType = aggregateLogs(logsForType, intervalForType, logName);
        aggregatedLogs[logTypes.name[logName]] = avgLogsForType;
      });

      callback(null, aggregatedLogs);
    });

  }

  configAvgLogs(savingInterval) {
    if (this.saveAvgLogsTimer) {
      clearInterval(this.saveAvgLogsTimer);
    }
    this.saveAvgLogsTimer = setInterval(() => {
      aggregatedLogs.forEach((avgLog) => {
        avgLog.data.responseTime.avg /= avgLog.data.requests.count;
        avgLog.data.bodySize.request /= avgLog.data.requests.count;
        avgLog.data.bodySize.response /= avgLog.data.requests.count;
        avgLog.data.requests.time = savingInterval;
        avgLog.timestamp = new Date();

        this.create(avgLog, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
      aggregatedLogs.clear();
    }, savingInterval);
  };
}

const logNeedAggregation = (logType) => {
  const logTypesForAggregation = [logTypes.HTTP_STATS];
  
  return logTypesForAggregation.indexOf(logType) > -1;
}; 

const aggregateLogMessage = (logMessage) => {
  const { companyToken } = logMessage;
  const appId = logMessage.app.id;
  const { route, method } = logMessage.data;
  const httpLogKey = `${companyToken}_${appId}_${route}_${method}`;

  if (aggregatedLogs.has(httpLogKey)) {
    const currentAvgLog = aggregatedLogs.get(httpLogKey);
    
    currentAvgLog.data.responseTime.min = Math.min(currentAvgLog.data.responseTime.min, logMessage.data.responseTime);
    currentAvgLog.data.responseTime.max = Math.max(currentAvgLog.data.responseTime.max, logMessage.data.responseTime);
    currentAvgLog.data.responseTime.avg += logMessage.data.responseTime;
    currentAvgLog.data.bodySize.request += logMessage.data.reqSize;
    currentAvgLog.data.bodySize.response += logMessage.data.resSize;
    currentAvgLog.data.requests.count++;

    aggregatedLogs.set(httpLogKey, currentAvgLog);
  } else {
    aggregatedLogs.set(httpLogKey, createHttpAvgLog(logMessage));
  }
}

const createHttpAvgLog = (logMessage) => {
  const avgLog = { logType: logTypes.HTTP_AVG };

  avgLog.companyToken = logMessage.companyToken;
  avgLog.app = logMessage.app;
  avgLog.data = {
    route: logMessage.data.route,
    method: logMessage.data.method,
    responseTime: {
      min: logMessage.data.responseTime,
      max: logMessage.data.responseTime,
      avg: logMessage.data.responseTime
    },
    bodySize: {
      request: logMessage.data.reqSize,
      response: logMessage.data.resSize
    },
    requests: { 
      count: 1,
      time: 0
    }
  };

  return avgLog;
};

module.exports = new LogService();
