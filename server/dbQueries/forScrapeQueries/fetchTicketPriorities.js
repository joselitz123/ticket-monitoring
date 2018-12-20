const ticet_priority_model = require('../../database/collections/ticket_priorities/ticket_priority_model');
const logger = require('../../logger/loggerSettings')();


let ticketPriorities = []; //contains list of cached ticket priorities from database

/** 
 * Fetches the list of ticket priorities from the database and returns it if already fetched before for easy caching
 */
function fetchTicketPriorities(){

    return new Promise(async (resolve, reject)=>{

        try {

            if (ticketPriorities.length == 0) {
        
                const ticketPrioritiesModel = await ticet_priority_model();
        
                await ticketPrioritiesModel.find()
                .then(data=>{
                    logger.trace('Fetched the ticket priorities', data);
                    ticketPriorities = data;
                    resolve(ticketPriorities);
                })
                .catch(err=>{
                    logger.error(err, 'Error fetching the ticket priorities');
                    reject();
                });
        
            }else{
        
                resolve(ticketPriorities);
        
            }
            
        } catch (error) {
            
            logger.error(error, 'Issue occured while fetching the list of Piority levels from database');
            reject(error);

        }

    });

}

module.exports = fetchTicketPriorities;