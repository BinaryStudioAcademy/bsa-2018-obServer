const connection = require('../db/dbConnect');
const logMessage = require('../db/models/logMessage');
const logTypes = require('../utils/logTypes');

class LogRepository {
  constructor() {
    this.model = logMessage;
  }

  create(log, callback) {
    if (log.logType === logTypes.CPU_SERVER || log.logType === logTypes.MEMORY_SERVER) {
      this.model.findOne({ companyId: log.companyToken })
        .then(res => {
          if (res) {
            this.model.update(
              { companyId: log.companyToken },
              { $push : { [`serverData.${logTypes.name[log.logType]}`] : { ...log.data, timestamp: log.timestamp }}},
              {upsert: true},
              callback 
            );
          } else {
            const doc = new this.model({ 
              companyId: log.companyToken, 
              serverData: {
                [logTypes.name[log.logType]]: { ...log.data, timestamp: log.timestamp }
              } 
            });
            doc.save(callback);
          }
        });
    } else {
      this.model.findOne({ companyId: log.companyToken, 'appsData.appId': log.app.id }) 
        .then(res => {
          if (res) {
            this.model.update(
              { companyId: log.companyToken, 'appsData.appId': log.app.id },
              { $push : { [`appsData.$.logs.${logTypes.name[log.logType]}`] : { ...log.data, timestamp: log.timestamp }}},
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
                      [logTypes.name[log.logType]]: [{ ...log.data, timestamp: log.timestamp }]
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
                        [logTypes.name[log.logType]]: [{ ...log.data, timestamp: log.timestamp }]
                      }
                    }] 
                  });
                  doc.save(callback);
                }
              })
          }
        });
    }  
  }

  getByCompanyId(id, callback) {
    this.model.find({ "companyId": id }, callback);
  }
}

module.exports = new LogRepository();