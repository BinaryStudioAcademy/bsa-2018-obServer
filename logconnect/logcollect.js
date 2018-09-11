const logcollect = require('./logcollect/server');
module.exports = (logcollectPort, companyId) => {
  return logcollect(logcollectPort, companyId);
}