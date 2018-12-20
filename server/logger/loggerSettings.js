const pino = require('pino');
const path = require('path');

module.exports = function loggerSettings(){

        const logger = pino({
            useLevelLabels: true,
            changeLevelName: 'logType',
            level: 10
        },
        pino.destination(path.join(__dirname,'/operationLogs')));

        return logger;

}