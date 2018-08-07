const sendHelper = require('./apiRequest');
const cpuLoad = require('./osUtils/cpu');
const memoryStats = require('./osUtils/memory'); 

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

function startMemoryMonitor(delay = 1000) {
  if(!timersId.memory) {
    timersId.memory = setInterval(() => {
      sendMetrics(createMetricObject('memory', memoryStats()));
    }, delay);
  }
}

function stopMemoryMonitor() {
  clearInterval(timersId.memory);
  delete timersId.memory;
}

function createMetricObject(name, data) {
  return { type: name, value: data, timeStamp: new Date() };
}

module.exports = {
  init,
  newMetrics,
  startCPUMonitor,
  stopCPUMonitor,
  startMemoryMonitor,
  stopMemoryMonitor,
};
