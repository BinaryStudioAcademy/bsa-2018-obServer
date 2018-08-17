const connection = require('../db/dbConnect');
const logMessage = require('../db/models/logMessage');
const logTypes = require('../utils/logTypes');

class LogRepository {
  constructor() {
    this.model = logMessage;
  }

  async create(log, callback) {
    if (isThisServerLogType(log.logType)) {
      this.model.update(
        { companyId: log.companyToken },
        { $push: {
            [`serverData.${logTypes.name[log.logType]}`] : { ...log.data, timestamp: log.timestamp }
          }
        },
        {upsert: true},
        callback 
      );
    } else {
      const companyAndAppExist = await this.model.findOne({ companyId: log.companyToken, 'appsData.appId': log.app.id }); 
      if (companyAndAppExist) {
        this.model.update(
          { companyId: log.companyToken, 'appsData.appId': log.app.id },
          { $push: {
              [`appsData.$.logs.${logTypes.name[log.logType]}`] : { ...log.data, timestamp: log.timestamp }
            }
          },
          {upsert: true},
          callback 
        ); 
      } else {
        this.model.update(
          { companyId: log.companyToken },
          { $push: { 
              appsData: {
                appId: log.app.id,
                appName: log.app.name,
                logs: { 
                  [`${logTypes.name[log.logType]}`] : { ...log.data, timestamp: log.timestamp }
                }
              }
            }
          },
          {upsert: true},
          callback 
        );
      }
    }  
  }

  getByCompanyId(id, callback) {
    this.model.find({ "companyId": id }, callback);
  }
}

const isThisServerLogType = (logType) => {
  if (logType === logTypes.CPU_SERVER || logType === logTypes.MEMORY_SERVER) {
    return true;
  }
  return false;
};

module.exports = new LogRepository();