const os = require("os");

const cpuAverage = () => {
  const cpusTimes = [];
  const cpus = os.cpus();

  cpus.forEach(cpu => {
    let totalTick = 0;

    for (type in cpu.times) {
      totalTick += cpu.times[type];
    }

    cpusTimes.push({ totalTick: totalTick, idleTick: cpu.times.idle });
  });

  return cpusTimes;
};

module.exports = callback => {
  const startMeasure = cpuAverage();

  setTimeout(() => {
    const endMeasure = cpuAverage();
    const percentageCPU = [];
    let totalCpuLoadPercentage = 0;

    for (let i = 0; i < startMeasure.length; i++) {
      const idleDifference = endMeasure[i].idleTick - startMeasure[i].idleTick;
      const totalDifference =
        endMeasure[i].totalTick - startMeasure[i].totalTick;
      const percentageCoreCPU =
        100 - Math.round((100 * idleDifference) / totalDifference);

      percentageCPU.push({
        coreName: `core${i}`,
        coreLoadPercentages: percentageCoreCPU
      });

      totalCpuLoadPercentage += percentageCoreCPU;
    }

    totalCpuLoadPercentage = Math.round(
      totalCpuLoadPercentage / startMeasure.length
    );

    callback({ cores: percentageCPU, totalLoad: totalCpuLoadPercentage });
  }, 200);
};
