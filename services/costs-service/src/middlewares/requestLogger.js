const pino = require('pino');

const logger = pino({ level: 'info' });

const sendLog = async (logData) => {
    try {
        await fetch(process.env.LOGS_SERVICE_URL + '/api/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData)
        });
    } catch (err) {
        logger.error({ err }, 'Failed to send log');
    }
};

const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const logData = {
            method: req.method,
            endpoint: req.originalUrl,
            status: res.statusCode,
            timestamp: new Date(),
            message: `duration_ms=${Date.now() - start}`
        };

        sendLog(logData);
    });

    next();
};

module.exports = requestLogger;
