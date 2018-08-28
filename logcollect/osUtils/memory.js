const os = require("os");

module.exports = () => {
  const freeMemory = Math.floor(os.freemem() / 10e5);
  const allMemory = Math.floor(os.totalmem() / 10e5);
  const freeMemoryPercentage = Math.floor(freeMemory / allMemory * 100);
  return { freeMemory, allMemory, freeMemoryPercentage };
}