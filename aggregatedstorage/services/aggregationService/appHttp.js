const logTypes = require('../../utils/logTypes');

module.exports = (slicedLogs) => {
  const aggregatedAppHttpLogs = [];
  slicedLogs.forEach((logChunk, i) => {
    if (logChunk[0].isEmpty) {
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
      item.responseTimeAvg = Math.ceil(item.responseTimeAvg / item.requestsCount); 
      item.bodySizeRequest = Math.ceil(item.bodySizeRequest / item.requestsCount); 
      item.bodySizeResponse = Math.ceil(item.bodySizeResponse / item.requestsCount);
      item.responseTimeMin = Math.ceil(item.responseTimeMin);
      item.responseTimeMax = Math.ceil(item.responseTimeMax);
      
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
