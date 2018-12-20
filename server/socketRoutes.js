const logger = require('./logger/loggerSettings')();
/**
* Setup the socket IO connection and its routes
 * @param {Object} io 
 */
function socketSetup(io){

    io.of('/priorities_dashboard').on('connection',(socket)=>{
        logger.trace('Client already listening to /priorities_dashboard via');
         module.exports.priorities_dashboard = socket;
        });//ticket priority board

    io.of('/doughnut_dashboard').on('connection',(socket)=>{
        logger.trace('Client already listening to /doughnut_dashboard via');
            module.exports.doughnut_dashboard = socket;
        });//ticket priority board

}

module.exports = socketSetup;