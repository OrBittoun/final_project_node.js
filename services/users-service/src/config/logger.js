const pino = require('pino');

const logger = pino({
    level: 'info' //print "info" level and above
});

module.exports = logger;
