const logTypes = require('../../utils/logTypes');
const serverMemoryAvg = require('./serverMemory');
const serverCpuAvg = require('./serverCpu');
const appHttpStatsAvg = require('./appHttp');
const appCpuAvg = require('./appCpu');
const appMemoryAvg = require('./appMemory');
const socketStatsAvg = require('./socketStats');

const aggregateLogs = (logs, interval, logType) => {
  if (logs.length === 0) {
    return [];
  }

  if (logDoNotNeedAggregation(logType)) {
    return logs;
  }

  const slicedLogs = sliceLogsByInterval(logs, interval);
  return getAvgLogs(slicedLogs, logType);
};

const sliceLogsByInterval = (logArray, interval) => {
  let timeInterval = new Date(logArray[0].timestamp);
  timeInterval.setTime(timeInterval.getTime() + interval);
  let chunkIndex = 0; 
  
  return logArray.reduce((resultArray, item, index) => { 
    const logTime = new Date(item.timestamp);

    while(logTime.getTime() > timeInterval.getTime()) {
      chunkIndex += 1;
      resultArray[chunkIndex] = [];
      if (logTime.getTime() > timeInterval.getTime() + interval) {
        resultArray[chunkIndex] = [{ isEmpty: true, timestamp: timeInterval.toISOString() }];
      }
      timeInterval.setTime(timeInterval.getTime() + interval);
    }
    
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [[]]);
};

const getAvgLogs = (slicedLogs, logType) => {
  switch (logType) {
    case logTypes.MEMORY_SERVER:
      return serverMemoryAvg(slicedLogs);
    case logTypes.CPU_SERVER:
      return serverCpuAvg(slicedLogs);
    case logTypes.HTTP_STATS:
      return appHttpStatsAvg(slicedLogs);
    case logTypes.CPU_APP:
      return appCpuAvg(slicedLogs);
    case logTypes.MEMORY_APP:
      return appMemoryAvg(slicedLogs);
    case logTypes.SOCKETS_STATS:
      return socketStatsAvg(slicedLogs);
    default:
      return [];
  }
}

const parseLogTypesFromIntervals = (intervals, appId) => {
  const appLogs = {
    httpInterval: logTypes.HTTP_STATS,
    appCpuInterval: logTypes.CPU_APP,
    appMemoryInterval: logTypes.MEMORY_APP,
    socketStatsUnterval: logTypes.SOCKETS_STATS
  };
  const serverLogs = {
    serverMemoryInterval: logTypes.MEMORY_SERVER,
    serverCpuInterval: logTypes.CPU_SERVER,
    logMessageInterval: logTypes.LOG_MESSAGE
  }

  const intervalLogTypes = Object.assign({}, appLogs, serverLogs);

  const parsedLogTypes = [];

  for (let key in intervals) {
    const logType = intervalLogTypes[key];
    if (!logType) continue;
    if (appLogs[key] && !appId) continue;

    parsedLogTypes.push(logType);
  }

  return parsedLogTypes;
};

const parseIntervals = (intervals) => {
  const intervalLogTypes = {
    httpInterval: logTypes.HTTP_STATS,
    serverMemoryInterval: logTypes.MEMORY_SERVER,
    serverCpuInterval: logTypes.CPU_SERVER,
    appCpuInterval: logTypes.CPU_APP,
    appMemoryInterval: logTypes.MEMORY_APP,
    logMessageInterval: logTypes.LOG_MESSAGE,
    socketStatsUnterval: logTypes.SOCKETS_STATS
  }

  const parsedIntervals = {};
  for (let key in intervals) {
    const logType = intervalLogTypes[key];
    if (logType) {
      parsedIntervals[logType] = parseInt(intervals[key]);
    }
  }
  return parsedIntervals;
};

const logDoNotNeedAggregation = logType => logType === logTypes.LOG_MESSAGE;

module.exports = {
  aggregateLogs,
  parseLogTypesFromIntervals,
  parseIntervals
};