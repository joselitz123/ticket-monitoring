const logger = require('./logger/loggerSettings')();
/**
* Setup the socket IO connection and its routes
 * @param {Object} io 
 */
function socketSetup(io){

    io.of('/priorities_dashboard').on('connection',(socket)=>{
        logger.trace(`Client already listening to /priorities_dashboard via ${socket}`);
         module.exports.priorities_dashboard = socket;
        });//ticket priority board

    io.of('/doughnut_dashboard').on('connection',(socket)=>{
        logger.trace(`Client already listening to /doughnut_dashboard via ${socket}`);
            module.exports.doughnut_dashboard = socket;
        });//doughnut board

    io.of('/action_notification').on('connection',(socket)=>{
        logger.trace(`Client already listening to /action_notification via ${socket}`);
            module.exports.action_notification = socket;
        });//action notification board

    io.of('/user_acc').on('connection', (socket) => {
        logger.trace(`Client already listening to /user_acc via ${socket}`);
        module.exports.user_acc = socket;
    });//Name of the logged in user

}

module.exports = socketSetup;