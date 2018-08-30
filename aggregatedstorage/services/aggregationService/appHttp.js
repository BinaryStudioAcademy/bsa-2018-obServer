const logTypes = require('../../utils/logTypes');

module.exports = (slicedLogs) => {
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
        currentLog.requestsCount += item.requestsCount;
      } else {
        logsByRouteAndMethod.set(httpLogKey, {
          route: route,
          method: method,
          responseTimeMin: item.responseTime.min,
          responseTimeMax: item.responseTime.max,
          responseTimeAvg: item.responseTime.avg,
          bodySizeRequest: item.bodySize.request,
          bodySizeResponse: item.bodySize.response,
          requestsCount: item.requestsCount
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
