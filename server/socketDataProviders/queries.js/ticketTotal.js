const ticketPriorityCountQuery = require('../../dbQueries/forDataProviderQueries/ticketPriorityCount');
const logger = require('../../logger/loggerSettings')();

/**
 * Performs feeding of data for the total of ticket priority count
 */
function ticketPriorityCount(io){

    return new Promise(async (resolve, reject)=>{

        try {
            
            const result = await ticketPriorityCountQuery();
            
            logger.info('Pulled the count of every priority level of tickets', result);

            await io.volatile.emit('ticket_count', result);
            

            resolve();
            
        } catch (error) {
            
            reject(error);

        }

    })

}

module.exports = ticketPriorityCount;