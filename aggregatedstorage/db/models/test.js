const httpStats = require('./httpStats');

// module.exports = function start() {
//   const obj = {
//     // cores: [{ coreName: 'core0', coreLoadPercentages: 25 }, { coreName: 'core1', coreLoadPercentages: 57 }],
//     timestamp: new Date(),
//     serverId: 555,
//   };
//   cpuServer.create(obj, (err, cpuStats) => {
//     if(!err) {
//       console.log(cpuStats);
//     } else {
//       console.log(err.message);
//     }
//   });
// }

module.exports = function start() {
  const obj = {
    requests: { frequency: 59 },
    responseTime: [{ route: 'api/admin', min: 2, max: 29, avg: 14 }],
    timestamp: new Date(),
    serverId: 555,
  };
  httpStats.create(obj, (err, cpuStats) => {
    if(!err) {
      console.log(cpuStats);
    } else {
      console.log(err.message);
    }
  });
}