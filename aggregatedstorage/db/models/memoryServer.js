const mongoose = require('mongoose');

const memoryServer = mongoose.Schema({
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
  },
  timestamp: {
    type: Date,
    required: true
  }
});

module.exports = memoryServer;
