const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    // Log de la requête entrante
    logger.info('HTTP Request', {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString()
    });
    
    // Intercepter la réponse
    res.on('finish', () => {
        const duration = Date.now() - start;
        
        logger.info('HTTP Response', {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        });
    });
    
    next();
};

module.exports = requestLogger;