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

  async getLogsByCompanyAndTypeForInterval(companyId, appId, logType, interval, callback) {
    const logs = await axios.get('http://localhost:3080/api/logs', {
        params: {
          logtype: logType,
          company: companyId,
          appid: appId
        }
      })
      .then(response => response.data)
      .catch(err => callback(err));

    const aggregatedLogs = aggregateLogs(logs, interval, logType);
    callback(null, aggregatedLogs);
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

const aggregateLogs = (logs, interval) => {
  if (logs.length === 0) {
    return [];
  }

  const logType = logs[0].logType;

  const slicedLogs = sliceLogsByInterval(logs, interval);
  // console.log(slicedLogs[0][0]);
  // console.log(slicedLogs[0][347]);
  // console.log(slicedLogs[8][0]);
  // console.log(slicedLogs[8][826]);
  console.log(logType);
  const a = getAvgLogs(slicedLogs, logType);
  // console.log(a);
  return a;
};

const sliceLogsByInterval = (logArray, interval) => {
  let timeInterval = new Date(logArray[0].timestamp);
  timeInterval.setTime(timeInterval.getTime() + interval);
  let chunkIndex = 0; 
  // console.log(timeInterval);
  
  return logArray.reduce((resultArray, item, index) => { 
    const logTime = new Date(item.timestamp);

    while(logTime.getTime() > timeInterval.getTime()) {
      resultArray[++chunkIndex] = [];
      timeInterval.setTime(timeInterval.getTime() + interval);
      // console.log(resultArray.length);
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
      sumFreeMem += item.data.freeMemory;
      return sumFreeMem;
    }, 0) / logChunk.length;

    aggregatedServerMemoryLogs.push({
      logType: logTypes.MEMORY_SERVER,
      timestamp: logChunk[0].timestamp,
      data: {
        totalMemory: logChunk[0].data.allMemory,
        freeMemory: Math.round(avgFreeMemory),
        usedMemoryPercentage: Math.round(avgFreeMemory / logChunk[0].data.allMemory * 100) 
      }
    });
  });
  return aggregatedServerMemoryLogs;
};

const serverCpuAvg = (slicedLogs) => {
  console.log(JSON.stringify(slicedLogs[0][0]));
  const aggregatedCpuMemoryLogs = [];
  slicedLogs.forEach((logChunk, i) => {
    if (logChunk.length === 0) {
      aggregatedCpuMemoryLogs.push({
        logType: logTypes.CPU_SERVER,
        data: null
      });
      return;
    }

    let cores = new Array(logChunk[0].data.cores.length);
    cores.fill(0);

    const coreLoadSumm = logChunk.reduce((cores, item) => {
      item.data.cores.forEach((core, i) => {
        cores[i] += core.coreLoadPercentages;
      });
      return cores;
    }, cores);

    const avgCoreLoad = coreLoadSumm.map(load => Math.round(load / logChunk.length));

    aggregatedCpuMemoryLogs.push({
      logType: logTypes.CPU_SERVER,
      timestamp: logChunk[0].timestamp,
      data: {
        cores: avgCoreLoad
      }
    });
  });
  return aggregatedCpuMemoryLogs;
};

const appHttpStatsAvg = (slicedLogs) => {
  console.log(slicedLogs.length);
  const aggregatedAppHttpLogs = [];
  slicedLogs.forEach((logChunk, i) => {
    if (logChunk.length === 0) {
      aggregatedAppHttpLogs.push([]);
      return;
    }

    const logsByRouteAndMethod = new Map();

    logChunk.forEach((item) => {
      const { route, method } = item.data;
      const httpLogKey = `${route}_${method}`;

      if (logsByRouteAndMethod.has(httpLogKey)) {
        const currentLog = logsByRouteAndMethod.get(httpLogKey);
        currentLog.responseTimeMin = Math.min(currentLog.responseTimeMin, item.data.responseTime);
        currentLog.responseTimeMax = Math.min(currentLog.responseTimeMax, item.data.responseTime);
        currentLog.responseTimeAvg += item.data.responseTime;
        currentLog.bodySizeRequest += item.data.reqSize;
        currentLog.bodySizeResponse += item.data.resSize;
        currentLog.requestsCount++;
      } else {
        logsByRouteAndMethod.set(httpLogKey, {
          route: route,
          method: method,
          responseTimeMin: item.data.responseTime,
          responseTimeMax: item.data.responseTime,
          responseTimeAvg: item.data.responseTime,
          bodySizeRequest: item.data.reqSize,
          bodySizeResponse: item.data.resSize,
          requestsCount: 1
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

module.exports = new LogService();