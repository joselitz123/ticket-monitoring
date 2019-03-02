const notificationModel = require('../../database/collections/notifications/notifications');
const logger = require('../../logger/loggerSettings')();
const { ObjectID } = require('mongodb');

/**
 * Inserts the fetched For Action ticket data to database
 * @param {Array} data - Array of ticket data for action
 * @param {String} notification_id - id of the notification type
 */
function insertNotification(data, notification_id) {

    return new Promise( async(resolve, reject) => {

        try {

            const forActionTicketCon = await notificationModel();

            const notif_id = ObjectID(notification_id);

            data.map(ticketData => {

                forActionTicketCon.findOneAndUpdate(
                    {ticket_id: ticketData.ticket_id, time_acknowledged: undefined, notif_id: notif_id},
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