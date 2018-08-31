const mongoose = require('mongoose');

const memoryServer = mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
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

const MemoryServer = mongoose.model('memoryServerStats', memoryServer);

module.exports = MemoryServer;
