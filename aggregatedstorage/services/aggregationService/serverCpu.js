const logTypes = require('../../utils/logTypes');

module.exports = (slicedLogs) => {
  const aggregatedServerCpuLogs = [];

  slicedLogs.forEach((logChunk, i) => {
    if (logChunk[0].isEmpty) {
      aggregatedServerCpuLogs.push({
        core0: 0,
        totalLoad: 0,
        timestamp: logChunk[0].timestamp        
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
