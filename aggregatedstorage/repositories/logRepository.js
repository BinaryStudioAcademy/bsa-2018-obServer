const connection = require('../db/dbConnect');
const companyLogs = require('../db/models/companyLogs');
const logTypes = require('../utils/logTypes');

class LogRepository {
  constructor() {
    this.model = companyLogs;
  }

  async create(log, callback) {
    if (isThisServerLogType(log.logType)) {
      this.model.update(
        { companyId: log.companyToken },
        { $push: {
            [`serverData.${logTypes.name[log.logType]}`] : { ...log.data, timestamp: log.timestamp, _id: log._id }
          }
        },
        { upsert: true },
        callback 
      );
    } else {
      const companyAndAppExist = await this.model.findOne({ companyId: log.companyToken, 'appsData.appId': log.app.id }); 
      if (companyAndAppExist) {
        this.model.update(
          { companyId: log.companyToken, 'appsData.appId': log.app.id },
          { $push: {
              [`appsData.$.logs.${logTypes.name[log.logType]}`] : { ...log.data, timestamp: log.timestamp, _id: log._id }
            }
          },
          { upsert: true },
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
                  [`${logTypes.name[log.logType]}`] : { ...log.data, timestamp: log.timestamp, _id: log._id }
                }
              }
            }
          },
          { upsert: true },
          callback 
        );
      }
    }  
  }

  getByCompanyId(id, callback) {
    this.model.find({ "companyId": id }, callback);
  }

  getByCompanyIdByDaysFromNow(id, fromDate, callback) {
    this.model.aggregate([
      { $match: {
          "companyId": "secret-header-token"
      }},
      { $project: {
        companyId: true,  
        "serverData.memoryServer":  getFilter('serverData', 'memoryServer', fromDate),
        "serverData.cpuServer":  getFilter('serverData', 'cpuServer', fromDate),
      }}
    ], callback);
  }

  getAllByCompanyIdAppId(companyId, appId, serverLogsList, appLogsList, callback) {
    const match = { companyId };
    if (appId) {
      match['appsData.appId'] = appId;
    }

    const projection = {};
    serverLogsList.forEach((serverLogType) => {
      const dbFieldName = `serverData.${logTypes.name[serverLogType]}`;
      projection[dbFieldName] = 1;
    });
    appLogsList.forEach((appLogType) => {
      const dbFieldName = `appsData.logs.${logTypes.name[appLogType]}`;
      projection[dbFieldName] = 1;
    });

    this.model.find(match, projection, callback);
  }
}

const isThisServerLogType = (logType) => {
  if (logType === logTypes.CPU_SERVER || logType === logTypes.MEMORY_SERVER) {
    return true;
  }
  return false;
};

const getFilter = (dataSource, dataType, fromDate) => {
  return {
    $filter: {
      input: `$${dataSource}.${dataType}`,
      as: dataType,
      cond: {
        $gte: [
          `$$${dataType}.timestamp`,
          fromDate
        ]
      }
    }  
  };
};

module.exports = new LogRepository();