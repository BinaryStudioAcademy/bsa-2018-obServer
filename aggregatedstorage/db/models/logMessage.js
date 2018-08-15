const mongoose = require('mongoose');
const cpuServer = require('./cpuServer');
const memoryServer = require('./memoryServer');
const cpuApp = require('./cpuApp');
const errorLog = require('./errorLog');
const httpStats = require('./httpStats');
const memoryApp = require('./memoryApp');
const socketsStats = require('./socketsStats');

const logMessage = mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  serverData: {
    cpuServer: [cpuServer],
    memoryServer: [memoryServer]
  },
  appsData: [{
    appId: String,
    appName: String,
    logs: { 
      cpuApp: [cpuApp],
      memoryApp: [memoryApp],
      httpStats: [httpStats],
      socketsStats: [socketsStats],
      errorLog: [errorLog]
    }
  }]   
});

const LogMessage = mongoose.model('LogMessage', logMessage);

module.exports = LogMessage;