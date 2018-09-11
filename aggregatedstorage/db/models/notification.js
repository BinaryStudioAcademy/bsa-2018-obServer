const mongoose = require('mongoose');

const notification = mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  appId: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});

const Notification = mongoose.model('notification', notification);

module.exports = Notification;
