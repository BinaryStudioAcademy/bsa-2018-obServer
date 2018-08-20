const mongoose = require('mongoose');

const cpuServer = mongoose.Schema({
  cores: {
    type: [{
      coreName: {
        type: String,
        required: true
      },
      coreLoadPercentages: {
        type: Number,
        required: true
      }
    }],
    require: true
  },
  timestamp: {
    type: Date,
    required: true
  },
});

module.exports = cpuServer;
