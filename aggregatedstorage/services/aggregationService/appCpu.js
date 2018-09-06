module.exports = (slicedLogs) => {
  const aggregatedAppCpuLogs = [];

  slicedLogs.forEach((logsChunk) => {
    if (logChunk[0].isEmpty) {
      aggregatedAppCpuLogs.push({
        cpuUsagePercentages: 0
      });
      return;
    }

    let cpuUsagePercentages = 0;

    logsChunk.forEach((logItem) => {
      cpuUsagePercentages += logItem.cpuUsagePercentages;
    });
    
    aggregatedAppCpuLogs.push({
      cpuUsagePercentages: Math.round(cpuUsagePercentages / logsChunk.length),
      timestamp: logsChunk[0].timestamp
    });
  });
  return aggregatedAppCpuLogs;
}