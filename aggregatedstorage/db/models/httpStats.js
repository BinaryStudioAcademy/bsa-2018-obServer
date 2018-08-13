const mongoose = require('mongoose');

const httpStats = mongoose.Schema({
  requests: {
    frequency: {
      type: Number,
      required: true
    }
  },
  responseTime: {
    type: [{
      route: {
        type: String,
        required: true
      },
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
    }],
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

const HttpStats = mongoose.model('httpStats', httpStats);

module.exports = HttpStats;
