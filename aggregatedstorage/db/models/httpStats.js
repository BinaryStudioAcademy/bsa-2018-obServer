const mongoose = require('mongoose');

const httpStats = new mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  appId: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  requestsCount: {
    type: Number,
    required: true
  },
  bodySize: {
    request: {
      type: Number,
      required: true
    },
    response: {
      type: Number,
      required: true
    }
  },
  responseTime: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    avg: {
      type: Number,
      required: true
    }
  },
  timestamp: {
    type: Date,
    required: true
  }
});

const HttpStats = mongoose.model('httpStats', httpStats);

module.exports = HttpStats;
