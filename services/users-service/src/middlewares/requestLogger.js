const pino = require('pino');

const logger = pino({ level: 'info' });

const sendLog = async (logData) => {//sending a log to log service with http post
    try {
        await fetch(process.env.LOGS_SERVICE_URL + '/api/logs', {//getting from the logs
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData)
        });
    } catch (error) {
        logger.error({ error }, 'Failed to send log');
    }
};

const requestLogger = (req, res, next) => {//middleware (decideing when to send the log and what information to gather)
    const start = Date.now();

    res.on('finish', () => {//express event that happens after everything is done(route,response sent to the client...)
        const logData = {// the log itself
            method: req.method,
            endpoint: req.originalUrl,
            status: res.statusCode,
            timestamp: new Date(),
            message: `duration_ms=${Date.now() - start}`
        };

        sendLog(logData);//sending the log
    });

    next();//sending for the next route
};

module.exports = requestLogger;
