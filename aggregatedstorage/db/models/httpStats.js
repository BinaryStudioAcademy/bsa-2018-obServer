const mongoose = require('mongoose');

const httpStats = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
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
  requests: {
    count: {
      type: Number,
      required: true
    },
    time: {
      type: Number,
      required: true
    }
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

module.exports = httpStats;
