const mongoose = require('mongoose');
const cpuServer = require('./cpuServer');
const memoryServer = require('./memoryServer');

const logMessage = mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  appsData: [{
    appId: String,
    appName: String,
    logs: { 
      cpuServer: [cpuServer],
      memoryServer: [memoryServer]
    }
  }]   
});

const LogMessage = mongoose.model('LogMessage', logMessage);

module.exports = LogMessage;