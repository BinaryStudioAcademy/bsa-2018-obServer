const mongoose = require('mongoose');

const socketStats = mongoose.Schema({
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
  },
  serverId: {
    type: String,
    required: true
  }
});

const SocketsStats = mongoose.model('socketsStats', socketStats);

module.exports = SocketsStats;
