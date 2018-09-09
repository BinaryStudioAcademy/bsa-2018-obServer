const mongoose = require('mongoose');

const socketsStats = mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  appId: {
    type: String,
    required: true
  },
  rooms: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }],
  roomsAmount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});

const SocketsStats = mongoose.model('socketsStats', socketsStats);

module.exports = SocketsStats;
