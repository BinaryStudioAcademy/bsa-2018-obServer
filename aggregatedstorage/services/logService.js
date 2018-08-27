const mongoose = require('mongoose');
const axios = require('axios');
const logRepository = require('../repositories/logRepository');
const logTypes = require('../utils/logTypes');
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

  async getLogsForInterval(companyId, appId, logIntervals, callback) {
    const appLogTypes = parseLogTypesFromIntervals(logIntervals, true);
    const serverLogTypes = parseLogTypesFromIntervals(logIntervals, false);
    const intervals = getIntervals(logIntervals);
    console.log(appLogTypes);
    console.log(serverLogTypes);
    console.log(intervals);

    logRepository.getAllByCompanyIdAppId(companyId, appId, serverLogTypes, appLogTypes, (err, logs) => {
      if (err) {
        callback(err);
        return;
      }
      console.log(logs[0].appsData);
      const aggregatedLogs = {};

      serverLogTypes.forEach((logName) => {
        const logsForType = logs[0].serverData[logTypes.name[logName]];
        const intervalForType = intervals[logName];
        const avgLogsForType = aggregateLogs(logsForType, intervalForType, logName);
        aggregatedLogs[logTypes.name[logName]] = avgLogsForType;
      });

      appLogTypes.forEach((logName) => {
        const logsForType = logs[0].appsData[0].logs[logTypes.name[logName]];
        console.log(logsForType.length);
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
        console.log(avgLog);
      });
      aggregatedLogs.clear();
    }, savingInterval);
  };
}

const aggregateLogs = (logs, interval, logType) => {
  if (logs.length === 0) {
    return [];
  }

  // const logType = logs[0].logType;

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

const serverMemoryAvg = (slicedLogs) => {
  console.log(slicedLogs.length);
  const aggregatedServerMemoryLogs = [];
  slicedLogs.forEach((logChunk, i) => {
    if (logChunk.length === 0) {
      aggregatedServerMemoryLogs.push({
        logType: logTypes.MEMORY_SERVER,
        data: null
      });
      return;
    }

    const avgFreeMemory = logChunk.reduce((sumFreeMem, item) => {
      sumFreeMem += item.freeMemory;
      return sumFreeMem;
    }, 0) / logChunk.length;

    aggregatedServerMemoryLogs.push({
      logType: logTypes.MEMORY_SERVER,
      timestamp: logChunk[0].timestamp,
      data: {
        totalMemory: logChunk[0].allMemory,
        freeMemory: Math.round(avgFreeMemory),
        usedMemoryPercentage: Math.round(avgFreeMemory / logChunk[0].allMemory * 100) 
      }
    });
  });
  return aggregatedServerMemoryLogs;
};

const serverCpuAvg = (slicedLogs) => {
  const aggregatedServerCpuLogs = [];

  slicedLogs.forEach((logChunk, i) => {
    if (logChunk.length === 0) {
      aggregatedServerCpuLogs.push({
        logType: logTypes.CPU_SERVER,
        data: null
      });
      return;
    }

    let cores = new Array(logChunk[0].cores.length);
    cores.fill(0);

    const coreLoadSumm = logChunk.reduce((cores, item) => {
      item.cores.forEach((core, i) => {
        cores[i] += core.coreLoadPercentages;
      });
      return cores;
    }, cores);

    const avgCoreLoad = coreLoadSumm.map(load => Math.round(load / logChunk.length));

    aggregatedServerCpuLogs.push({
      logType: logTypes.CPU_SERVER,
      timestamp: logChunk[0].timestamp,
      data: {
        cores: avgCoreLoad
      }
    });
  });
  return aggregatedServerCpuLogs;
};

const appHttpStatsAvg = (slicedLogs) => {
  const aggregatedAppHttpLogs = [];
  slicedLogs.forEach((logChunk, i) => {
    if (logChunk.length === 0) {
      aggregatedAppHttpLogs.push([]);
      return;
    }

    const logsByRouteAndMethod = new Map();

    logChunk.forEach((item) => {
      const { route, method } = item;
      const httpLogKey = `${route}_${method}`;

      if (logsByRouteAndMethod.has(httpLogKey)) {
        const currentLog = logsByRouteAndMethod.get(httpLogKey);
        currentLog.responseTimeMin = Math.min(currentLog.responseTimeMin, item.responseTime.min);
        currentLog.responseTimeMax = Math.min(currentLog.responseTimeMax, item.responseTime.max);
        currentLog.responseTimeAvg += item.responseTime.avg;
        currentLog.bodySizeRequest += item.bodySize.request;
        currentLog.bodySizeResponse += item.bodySize.response;
        currentLog.requestsCount += item.requests.count;
      } else {
        logsByRouteAndMethod.set(httpLogKey, {
          route: route,
          method: method,
          responseTimeMin: item.responseTime.min,
          responseTimeMax: item.responseTime.max,
          responseTimeAvg: item.responseTime.avg,
          bodySizeRequest: item.bodySize.request,
          bodySizeResponse: item.bodySize.response,
          requestsCount: item.requests.count
        });
      }

    });

    const aggregatedLogsForRoutes = [];
    logsByRouteAndMethod.forEach(item => {
      item.responseTimeAvg = Math.round(item.responseTimeAvg / item.requestsCount); 
      item.bodySizeRequest = Math.round(item.bodySizeRequest / item.requestsCount); 
      item.bodySizeResponse = Math.round(item.bodySizeResponse / item.requestsCount);
      
      aggregatedLogsForRoutes.push({
        logType: logTypes.HTTP_STATS,
        timestamp: logChunk[0].timestamp,
        data: item
      });
    });    

    aggregatedAppHttpLogs.push(aggregatedLogsForRoutes);
  });
  return aggregatedAppHttpLogs;
};

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

const parseLogTypesFromIntervals = (intervals, returnAppLogs) => {
  const appLogs = {
    httpInterval: logTypes.HTTP_STATS 
  };
  const serverLogs = {
    serverMemoryInterval: logTypes.MEMORY_SERVER,
    serverCpuInterval: logTypes.CPU_SERVER
  }

  const parsedLogTypes = [];
  if (returnAppLogs) {
    for (let key in intervals) {
      const logType = appLogs[key];
      if (logType) {
        parsedLogTypes.push(logType);
      }
    }
  } else {
    for (let key in intervals) {
      const logType = serverLogs[key];
      if (logType) {
        parsedLogTypes.push(logType);
      }
    }
  }
  return parsedLogTypes;
};

const getIntervals = (intervals) => {
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

module.exports = new LogService();