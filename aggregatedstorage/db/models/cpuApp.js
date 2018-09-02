const mongoose = require('mongoose');

const cpuApp = mongoose.Schema({
  cpuUsagePercentages: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});

const CpuApp = mongoose.model('cpuApp', cpuApp);

module.exports = CpuApp;
