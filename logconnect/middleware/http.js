const createLog = require('../utils/createLogObject'); 

module.exports = (sendLog, appId) => {
  return (req, res, next) => {
    const start = process.hrtime();
    
    res.on('finish', () => {
      const elapsedHrTime = process.hrtime(start);
      const timeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

      const log = createLog('HTTP_STATS', {
        route: req.path,
        method: req.method,
        responseTime: timeInMs,
        statusCode: res.statusCode,
        reqSize: +req.get('content-length') || req.socket.bytesRead,
        resSize: +res.getHeader('content-length') || res._contentLength
      }, appId);

      sendLog(log);
    });

    next();
  }
}