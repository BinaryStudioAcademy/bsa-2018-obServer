const connection = require('../db/dbConnect');
const logMessage = require('../db/models/logMessage');

class LogRepository {
  constructor() {
    this.model = logMessage;
  }

  create(log, callback) {
    this.model.findOne({ companyId: log.companyToken, 'appsData.appId': log.app.id}) 
      .then(res => {
        if (res) {
          this.model.update(
            { companyId: log.companyToken, 'appsData.appId': log.app.id },
            { $push : { [`appsData.$.logs.${log.logType}`] : {...log.data, timestamp: log.timestamp} }},
            {upsert: true},
            callback 
          ); 
        } else {
          this.model.findOne({ companyId: log.companyToken })
            .then(res => {
              if (res) {
                res.appsData.push({
                  appId: log.app.id,
                  appName: log.app.name,
                  logs: {
                    [log.logType]: [{ ...log.data, timestamp: log.timestamp }]
                  }
                });
                res.save(callback);
              } else {
                const doc = new this.model({ 
                  companyId: log.companyToken, 
                  appsData: [{
                    appId: log.app.id,
                    appName: log.app.name,
                    logs: {
                      [log.logType]: [{ ...log.data, timestamp: log.timestamp }]
                    }
                  }] 
                });
                doc.save(callback);
              }
            })
        }
      });
  }

  getByCompanyId(id, callback) {
    this.model.find({ "companyId": id }, callback);
  }
}

module.exports = new LogRepository();