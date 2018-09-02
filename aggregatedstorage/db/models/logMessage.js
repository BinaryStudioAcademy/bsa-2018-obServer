const mongoose = require('mongoose');

const logMessage = mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  appId: {
    type: String,
    required: true
  },
  logLevel: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});

const LogMessage = mongoose.model('logMessage', logMessage);

module.exports = LogMessage;
