module.exports = (slicedLogs) => {
  const aggregatedAppLogs = [];
  slicedLogs.forEach((logChunk, i) => {
    if (logChunk.length === 0) {
      aggregatedAppLogs.push([]);
      return;
    }
    const logs = logChunk.map((item) => {
      return {
        id: item._id,
        logLevel: item.logLevel,
        message: item.message,
        timestamp: item.timestamp
      };
    });
    aggregatedAppLogs.push(logs);
  });
  return aggregatedAppLogs;
}
