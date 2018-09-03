const mongoose = require('mongoose');

const memoryApp = mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  appId: {
    type: String,
    required: true
  },
  heap: {
    total: {
      type: Number,
      required: true
    },
    used: {
      type: Number,
      required: true
    }
  },
  timestamp: {
    type: Date,
    required: true
  }
});

const MemoryApp = mongoose.model('memoryApp', memoryApp);

module.exports = MemoryApp;
