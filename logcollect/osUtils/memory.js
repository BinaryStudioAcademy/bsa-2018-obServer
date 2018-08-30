const os = require("os");
const free = require("free-memory");

module.exports = callback => {
  if (process.platform === "linux" && process.env.LANG === "en_US.UTF-8") {
    free((err, info) => {
      const freeMemory = Math.floor((info.mem.total - info.mem.used) / 1024);
      const allMemory = Math.floor(info.mem.total / 1024);
      const freeMemoryPercentage = Math.floor((freeMemory / allMemory) * 100);

      callback({ freeMemory, allMemory, freeMemoryPercentage });
    });
  } else {
    const freeMemory = Math.floor(os.freemem() / 1024 / 1024);
    const allMemory = Math.floor(os.totalmem() / 1024 / 1024);
    const freeMemoryPercentage = Math.floor((freeMemory / allMemory) * 100);
    callback({ freeMemory, allMemory, freeMemoryPercentage });
  }
};
