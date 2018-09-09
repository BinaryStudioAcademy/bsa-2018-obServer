const connection = require('../db/dbConnect');
const cpuServerRepository = require('./logsRepositories/cpuServerRepository');
const memoryServerRepository = require('./logsRepositories/memoryServerRepository');
const httpRepository = require('./logsRepositories/httpRepository');
const memoryAppRepository = require('./logsRepositories/memoryAppRepository');
const cpuAppRepository = require('./logsRepositories/cpuAppRepository');
const logMessageRepository = require('./logsRepositories/appLogMessageRepository');
const socketStatsRepository = require('./logsRepositories/socketsStatsRepository');
const logTypes = require('../utils/logTypes');

class LogRepository {
  create(log, callback) {
    switch (log.logType) {
      case logTypes.CPU_SERVER:
        cpuServerRepository.create(log, callback);
        break;
      case logTypes.MEMORY_SERVER:
        memoryServerRepository.create(log, callback);
        break;
      case logTypes.HTTP_STATS:
        httpRepository.create(log, callback);
        break;
      case logTypes.MEMORY_APP:
        memoryAppRepository.create(log, callback);
        break;
      case logTypes.CPU_APP:
        cpuAppRepository.create(log, callback);
        break;
      case logTypes.LOG_MESSAGE:
        logMessageRepository.create(log, callback);
        break;
      case logTypes.SOCKETS_STATS:
        socketStatsRepository.create(log, callback);
        break;
      default:
        callback(new Error('Wrong log type'));
    }
  }

  getLogsByCompanyIdAppId(companyId, appId, logType) {
    const promise = new Promise((resolve, reject) => {
      switch (logType) {
        case logTypes.CPU_SERVER:
          cpuServerRepository.getByCompanyId(companyId, (err, logs) => {
            if (!err) {
              resolve(logs);
            } else {
              reject(err);
            }
          }); 
          break;
        case logTypes.MEMORY_SERVER:
          memoryServerRepository.getByCompanyId(companyId, (err, logs) => {
            if (!err) {
              resolve(logs);
            } else {
              reject(err);
            }
          }); 
          break;
        case logTypes.HTTP_STATS:
          httpRepository.getByCompanyIdAndAppId(companyId, appId, (err, logs) => {
            if (!err) {
              resolve(logs);
            } else {
              reject(err);
            }
          });
          break;
        case logTypes.CPU_APP:
          cpuAppRepository.getByCompanyIdAndAppId(companyId, appId, (err, logs) => {
            if (!err) {
              resolve(logs);
            } else {
              reject(err);
            }
          });
          break;
        case logTypes.MEMORY_APP:
          memoryAppRepository.getByCompanyIdAndAppId(companyId, appId, (err, logs) => {
            if (!err) {
              resolve(logs);
            } else {
              reject(err);
            }
          });
          break;
        case logTypes.LOG_MESSAGE:
          logMessageRepository.getByCompanyId(companyId, (err, logs) => {
            if (!err) {
              resolve(logs);
            } else {
              reject(err);
            }
          });
          break;
        default:
          reject(new Error('Wrong log type'));
      }
    });
    return promise;
  }
}

module.exports = new LogRepository();