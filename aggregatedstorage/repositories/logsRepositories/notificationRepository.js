const AppLogGeneralRepository = require('./appLogGeneralRepository');
const NotificationModel = require('../../db/models/notification');

class Notification extends AppLogGeneralRepository {
  constructor() {
    super(NotificationModel);
  }

  create(log, callback) {
    const notification = {
      companyId: log.companyToken,
      appId: log.appId,
      timestamp: log.timestamp,
      message: log.data.message,
    };

    this.model.create(notification, callback);
  }
}

module.exports = new Notification();

