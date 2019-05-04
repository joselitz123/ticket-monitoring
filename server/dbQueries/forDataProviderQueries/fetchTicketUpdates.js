const ticketUpdateModel = require('../../database/collections/tckt_update_log/tckt_update_log');
const logger = require('../../logger/loggerSettings')();


/**
 * 
 * @param {*} ticket_id - ticket to fetch the updates
 */
const fetchTicketUpdates = (ticket_id) => {
    
    return new Promise(async (resolve, reject) => {

        try {

            const ticketUpdateCon = await ticketUpdateModel();

            ticketUpdateCon.find({ ticket_id: ticket_id})
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, 'An issue occured in fetchTicketUpdates');

                reject(err);

            })

            resolve();
            
        } catch (error) {

            logger.error(error, 'An issue occured in fetchTicketUpdates');

            reject(error);
            
        }


    })

}

module.exports = fetchTicketUpdates;