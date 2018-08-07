const os = require("os");

function cpuAverage() {
  const cpusTimes = [];
  const cpus = os.cpus();

  cpus.forEach((cpu) => {
    let totalTick = 0;

    for(type in cpu.times) {
      totalTick += cpu.times[type];
    }
    
    cpusTimes.push({ totalTick: totalTick, idleTick: cpu.times.idle });
  });

  return cpusTimes;
}

module.exports = function cpuLoad(callback) { 
  const startMeasure = cpuAverage();

  setTimeout(function() { 
    const endMeasure = cpuAverage();
    const percentageCPU = [];
    
    for(let i = 0; i < startMeasure.length; i++) {
      const idleDifference = endMeasure[i].idleTick - startMeasure[i].idleTick;
      const totalDifference = endMeasure[i].totalTick - startMeasure[i].totalTick;
      const percentageCoreCPU = 100 - Math.round(100 * idleDifference / totalDifference);

      percentageCPU.push({ coreName: `core${i}`, coreLoad: percentageCoreCPU });
      // console.log(`core${i} load ${percentageCoreCPU}%`);
    }

    callback(percentageCPU);
  }, 200);
}