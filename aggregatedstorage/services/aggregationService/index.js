const logTypes = require('../../utils/logTypes');
const serverMemoryAvg = require('./serverMemory');
const serverCpuAvg = require('./serverCpu');
const appHttpStatsAvg = require('./appHttp');


const aggregateLogs = (logs, interval, logType) => {
  if (logs.length === 0) {
    return [];
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
      resultArray[++chunkIndex] = [];
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
    default:
      return [];
  }
}

const parseLogTypesFromIntervals = (intervals, returnAppLogs, hasAppId) => {
  const appLogs = {
    httpInterval: logTypes.HTTP_STATS 
  };
  const serverLogs = {
    serverMemoryInterval: logTypes.MEMORY_SERVER,
    serverCpuInterval: logTypes.CPU_SERVER
  }

  const parsedLogTypes = [];

  if (returnAppLogs && hasAppId) {
    for (let key in intervals) {
      const logType = appLogs[key];
      if (logType) {
        parsedLogTypes.push(logType);
      }
    }
  } 

  if (!returnAppLogs) {
    for (let key in intervals) {
      const logType = serverLogs[key];
      if (logType) {
        parsedLogTypes.push(logType);
      }
    }
  }

  return parsedLogTypes;
};

const parseIntervals = (intervals) => {
  const intervalLogTypes = {
    httpInterval: logTypes.HTTP_STATS,
    serverMemoryInterval: logTypes.MEMORY_SERVER,
    serverCpuInterval: logTypes.CPU_SERVER
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

module.exports = {
  aggregateLogs,
  parseLogTypesFromIntervals,
  parseIntervals
};