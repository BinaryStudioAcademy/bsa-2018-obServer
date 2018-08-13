const mongoose = require('mongoose');

const memoryServer = mongoose.Schema({
  memory: {
    freeMemory: {
      type: Number,
      required: true
    },
    allMemory: {
      type: Number,
      required: true
    },
    freeMemoryPercentage: {
      type: Number,
      required: true
    }
  },
  timestamp: {
    type: Date,
    required: true
  },
  serverId: {
    type: String,
    required: true
  }
});

const MemoryServer = mongoose.model('memoryServerStats', memoryServer);

module.exports = MemoryServer;
