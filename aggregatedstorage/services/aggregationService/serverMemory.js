const logTypes = require('../../utils/logTypes');

module.exports = (slicedLogs) => {
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
      totalMemory: logChunk[0].allMemory,
      usedMemory: Math.round(logChunk[0].allMemory - avgFreeMemory),
      usedMemoryPercentage: Math.round(100 - (avgFreeMemory / logChunk[0].allMemory * 100)),
      timestamp: logChunk[0].timestamp
    });
  });
  return aggregatedServerMemoryLogs;
};
