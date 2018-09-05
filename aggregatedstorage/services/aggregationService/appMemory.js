module.exports = (slicedLogs) => {
  const aggregatedMemoryLogs = [];

  slicedLogs.forEach((logsChunk) => {
    if (logsChunk.length === 0) {
      aggregatedMemoryLogs.push({});
      return;
    }

    let totalHeap = 0;
    let usedHeap = 0;

    logsChunk.forEach((logItem) => {
      totalHeap += logItem.heap.total;
      usedHeap += logItem.heap.used;
    });
    
    aggregatedMemoryLogs.push({
      totalHeap: Math.round(totalHeap / logsChunk.length),
      usedHeap: Math.round(usedHeap / logsChunk.length),
      timestamp: logsChunk[0].timestamp
    });
  });
  return aggregatedMemoryLogs;
}