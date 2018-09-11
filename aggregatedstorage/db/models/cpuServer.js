const mongoose = require('mongoose');

const cpuServer = mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
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
  totalLoadPercentages: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
});

const CpuServer = mongoose.model('cpuServerStats', cpuServer);

module.exports = CpuServer;
