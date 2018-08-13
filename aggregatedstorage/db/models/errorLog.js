const mongoose = require('mongoose');

const errorLog = mongoose.Schema({
  errorMessage: {
    type: String,
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

const ErrorLog = mongoose.model('errorLogs', errorLog);

module.exports = ErrorLog;
