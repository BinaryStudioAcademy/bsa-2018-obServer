const mongoose = require('mongoose');

const logMessage = mongoose.Schema({
  logType: {
    type: String,
    required: true
  },
  data: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    required: true
  },
  companyToken: {
    type: String,
    required: true
  },
  app: {
    id: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    }
  }
});

const LogMessage = mongoose.model('LogMessage', logMessage);

module.exports = LogMessage;