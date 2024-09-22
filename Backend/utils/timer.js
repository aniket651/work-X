const logger = require('./logger.js').logger;

const timers = {};

// Use console.time as usual
exports.time = function(label) {
  timers[label] = Date.now();
};

// Use this to log timeEnd using Winston
exports.timeEnd = function(label) {
  const end = Date.now();
  const duration = end - timers[label];
  if (timers[label]) {
    logger.info(`Timer ended: ${label}, Duration: ${duration}ms`);
    delete timers[label];
  } else {
    logger.warn(`No such label: ${label}`);
  }
};