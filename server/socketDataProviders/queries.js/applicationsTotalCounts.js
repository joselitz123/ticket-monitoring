const logger = require('../../logger/loggerSettings')();
const appTicketCount = require('../../dbQueries/forDataProviderQueries/appTicketCount');

/**
 * Runs the socket data providing data on the doughnut graph
 * @param {*} io socket object connection
 */
function applicationsTotalCount(io){

    return new Promise(async (resolve, reject)=>{

        try {

            const data = await appTicketCount();

            await io.volatile.emit('app_total_count', data);

            resolve();
            
        } catch (error) {
            
            logger.error(error, 'Issue on performing the total count of tickets of each application');

            reject();

        }

    });

}

module.exports = applicationsTotalCount;