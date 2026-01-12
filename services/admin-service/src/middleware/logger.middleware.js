const logger = require('../config/logger');

const requestLogger = (req, res, next) => {

    res.on('finish', () => {
        logger.info ( {
            method: req.method,
            url: req.url,
            status: req.statusCode
        });
    });

    next();
};

module.exports = requestLogger;
