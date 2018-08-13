const mongoose = require('mongoose');
// temp general log schema
const logMessage = mongoose.Schema({
  logType: {
    type: String,
    required: true
  },
  data: { any: Object },
  timestamp: {
    type: Date,
    required: true
  },
  serverId: {
    type: String,
    required: true
  }
});

const LogMessage = mongoose.model('LogMessage', logMessage);

module.exports = LogMessage;