const logTypes = require('../../utils/logTypes');

module.exports = (slicedLogs) => {
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
