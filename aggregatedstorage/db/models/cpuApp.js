const mongoose = require('mongoose');

const cpuApp = mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  appId: {
    type: String,
    required: true
  },
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
