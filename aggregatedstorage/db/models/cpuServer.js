const mongoose = require('mongoose');

const cpuServer = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  cores: {
    type: [{
      coreName: {
        type: String,
        required: true
      },
      coreLoadPercentages: {
        type: Number,
        required: true
      }
    }],
    require: true
  },
  timestamp: {
    type: Date,
    required: true
  },
});

module.exports = cpuServer;
