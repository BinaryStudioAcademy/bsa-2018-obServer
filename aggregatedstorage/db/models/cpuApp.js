const mongoose = require('mongoose');

const cpuApp = mongoose.Schema({
  cpuUsagePercentages: {
    type: Number,
    required: true
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

const CpuApp = mongoose.model('cpuAppStats', cpuApp);

module.exports = CpuApp;
