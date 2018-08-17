const mongoose = require('mongoose');

const socketsStats = mongoose.Schema({
  rooms: [{
    roomName: {
      type: String,
      required: true
    },
    roomAmount: {
      type: Number,
      required: true
    }
  }],
  requests: {
    frequency: {
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

module.exports = socketsStats;
