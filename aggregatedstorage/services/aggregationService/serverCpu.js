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

    let totalCpuLoad = 0;
    let cores = new Array(logChunk[0].cores.length);
    cores.fill(0);

    const coreLoadSumm = logChunk.reduce((cores, item) => {
      item.cores.forEach((core, i) => {
        cores[i] += core.coreLoadPercentages;
      });
      totalCpuLoad += item.totalLoadPercentages;
      return cores;
    }, cores);

    const avgCoreLoad = coreLoadSumm.map(load => Math.round(load / logChunk.length));
    totalCpuLoad = Math.round(totalCpuLoad / logChunk.length);

    const coresLoad = {};
    avgCoreLoad.forEach((coreLoad, i) => {
      coresLoad[`core${i}`] = coreLoad;
    });

    const cpuLogForInterval = Object.assign({}, coresLoad);
    cpuLogForInterval.timestamp = logChunk[0].timestamp;
    cpuLogForInterval.totalLoad = totalCpuLoad;

    aggregatedServerCpuLogs.push(cpuLogForInterval);
  });
  return aggregatedServerCpuLogs;
};
