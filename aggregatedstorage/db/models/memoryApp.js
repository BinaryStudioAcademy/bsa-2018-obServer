const mongoose = require('mongoose');

const memoryApp = mongoose.Schema({
  memory: {
    heap: {
      type: Number,
      required: true
    },
    totalProcessMemory: {
      type: Number,
      required: true
    }
  },
  timestamp: {
    type: Date,
    required: true
  }
});

// const MemoryApp = mongoose.model('memoryAppStats', memoryApp);

module.exports = memoryApp;
