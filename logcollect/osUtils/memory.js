const free = require("free-memory");

module.exports = (callback) => {
  free((err, info) => {
    const freeMemory = Math.floor((info.mem.total - info.mem.used) / 1024);
    const allMemory = Math.floor(info.mem.total / 1024);
    const freeMemoryPercentage = Math.floor(freeMemory / allMemory * 100);
    
    callback({ freeMemory, allMemory, freeMemoryPercentage });
  });
}
