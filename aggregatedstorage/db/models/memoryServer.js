const mongoose = require('mongoose');

const memoryServer = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
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

module.exports = memoryServer;
