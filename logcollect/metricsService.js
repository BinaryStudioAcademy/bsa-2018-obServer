const sendHelper = require('./apiRequest');
const cpuLoad = require('./osUtils/cpu'); 

const timersId = {};
let sendMetrics;

function init(url) {
   sendMetrics = sendHelper(url); 
}

function newMetrics(data) {
  if(sendMetrics) {
    sendMetrics(data);
  }
}

function startCPUMonitor(delay = 1000) {
  if(!timersId.cpu) {
    timersId.cpu = setInterval(() => {
      cpuLoad((cpuData) => {
        sendMetrics(createMetricObject('cpu', cpuData));
      });
    }, delay);
  }
}

function stopCPUMonitor() {
  clearInterval(timersId.cpu);
  delete timersId.cpu;
}

function createMetricObject(name, data) {
  return { type: name, value: data, timeStamp: new Date() };
}

module.exports = {
  init,
  newMetrics,
  startCPUMonitor,
  stopCPUMonitor,
};
