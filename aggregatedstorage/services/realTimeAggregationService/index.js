const logRepository = require('../../repositories/logRepository');
const logTypes = require('../../utils/logTypes');

const aggregatedLogs = new Map();

const logNeedRealtimeAggregation = (logType) => {
  const logTypesForRealtimeAggregation = [logTypes.HTTP_STATS];
  
  return logTypesForRealtimeAggregation.indexOf(logType) > -1;
};

const aggregateRealTimeLog = (logMessage) => {
  const companyId = logMessage.companyToken;
  const appId = logMessage.appId;
  const { route, method } = logMessage.data;
  const httpLogKey = `${companyId}_${appId}_${route}_${method}`;

  if (aggregatedLogs.has(httpLogKey)) {
    const currentAvgLog = aggregatedLogs.get(httpLogKey);
    
    currentAvgLog.responseTime.min = Math.min(currentAvgLog.responseTime.min, logMessage.data.responseTime);
    currentAvgLog.responseTime.max = Math.max(currentAvgLog.responseTime.max, logMessage.data.responseTime);
    currentAvgLog.responseTime.avg += logMessage.data.responseTime;
    currentAvgLog.bodySize.request += logMessage.data.reqSize;
    currentAvgLog.bodySize.response += logMessage.data.resSize;
    currentAvgLog.requestsCount++;

    aggregatedLogs.set(httpLogKey, currentAvgLog);
  } else {
    aggregatedLogs.set(httpLogKey, createHttpAvgLog(logMessage));
  }
}

const createHttpAvgLog = (log) => {
  const avgLog = {
    logType: log.logType,
    companyId: log.companyToken,
    appId: log.appId,
    timestamp: log.timestamp,
    route: log.data.route,
    method: log.data.method,
    responseTime: {
      min: log.data.responseTime,
      max: log.data.responseTime,
      avg: log.data.responseTime
    },
    bodySize: {
      request: log.data.reqSize,
      response: log.data.resSize
    },
    requestsCount: 1
  };

  return avgLog;
};

const startRealTimeAvgLogs = (savingInterval) => {
  const saveAvgLogsTimer = setInterval(() => {
    aggregatedLogs.forEach((avgLog) => {
      avgLog.responseTime.avg = Math.ceil(avgLog.responseTime.avg / avgLog.requestsCount);
      avgLog.bodySize.request = Math.ceil(avgLog.bodySize.request / avgLog.requestsCount);
      avgLog.bodySize.response = Math.ceil(avgLog.bodySize.response / avgLog.requestsCount);

      logRepository.create(avgLog, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
    aggregatedLogs.clear();
  }, savingInterval);
};

startRealTimeAvgLogs(15000);

module.exports = {
  logNeedRealtimeAggregation,
  aggregateRealTimeLog
};