const forActionTicketModel = require('../../database/collections/for_action_tickets/for_action_tickets');
const logger = require('../../logger/loggerSettings')();

/**
 * Inserts the fetched For Action ticket data to database
 * @param {Array} data - Array of ticket data for action
 */
function insertForActionTicketData(data) {

    return new Promise( async(resolve, reject) => {

        try {

            const forActionTicketCon = await forActionTicketModel();

            data.map(ticketData => {

                forActionTicketCon.findOneAndUpdate(
                    {ticket_id: ticketData.ticket_id, is_acknowledged: false},
                    {...ticketData},
                    {upsert: true}
                )
                .catch(err => {

                    logger.error(err, 'An issue occured in insertForActionTicketData');
    
                    reject();
    
                });

            });

            // forActionTicketCon.insertMany(data)
            // .then(data => {

            //     resolve();

            // })
            // .catch(err => {

            //     logger.error(err, 'An issue occured in insertForActionTicketData');

            //     reject();

            // });

            resolve();
            
        } catch (error) {
            
            logger.error(error, 'An issue occured in insertForActionTicketData');

            reject();

        }

    })

}

module.exports = insertForActionTicketData;