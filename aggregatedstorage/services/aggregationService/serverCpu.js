const logTypes = require('../../utils/logTypes');

module.exports = (slicedLogs) => {
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
