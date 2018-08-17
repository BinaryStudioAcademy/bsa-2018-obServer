const mongoose = require('mongoose');

const errorLog = mongoose.Schema({
  errorMessage: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});

module.exports = errorLog;
