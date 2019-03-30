const notificationModel = require('../../database/collections/notifications/notifications');
const logger = require('../../logger/loggerSettings')();
const { ObjectID } = require('mongodb');

/**
 * Inserts the fetched For Action ticket data to database
 * @param {Array} data - Array of ticket data for action
 */
function insertNotification(data) {

    return new Promise( async(resolve, reject) => {

        try {

            const forActionTicketCon = await notificationModel();

            data.map(ticketData => {

                const { notif_id, ticket_id } = ticketData;

                forActionTicketCon.findOneAndUpdate(
                    {ticket_id: ticket_id, time_acknowledged: undefined, notif_id: ObjectID(notif_id)},
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

module.exports = insertNotification;