const ticketTotal = require('./queries.js/ticketTotal');
const appTicketCount = require('./queries.js/applicationsTotalCounts');
const logger = require('../logger/loggerSettings')();


/**
 * 
 * Pushes data to the frontend for ticket total and app ticket count
 */
function socketDataProviders(){
    
    return new Promise(async (resolve, reject)=>{

        try {

            logger.trace('Running queries to update the frontend dashboard at socketFunctions.js');
            
            const { priorities_dashboard, doughnut_dashboard } = await require('../socketRoutes');

            await Promise.all([
                ticketTotal(priorities_dashboard),
                appTicketCount(doughnut_dashboard)
            ]);
            

            resolve();
            
        } catch (error) {

            logger.error(error, 'An issue occured while running socketDataProviders');
            
            reject(error);

        }

    })

}

module.exports = socketDataProviders;