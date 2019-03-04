const logger = require('../../logger/loggerSettings');
const fetchNotifications = require('../../dbQueries/forDataProviderQueries/fetchNotifications');


/**
 * Socket data provider for action notification board
 */
function ticketAction() {

    return new Promise( async(resolve, reject) => {

        try {

            const fetchedNotif = await fetchNotifications();

            const { action_notification } = await require('../../socketRoutes');

            action_notification.volatile.emit('action_notification', fetchedNotif);

            resolve();
            
        } catch (error) {

            logger.error(error, 'An issue occured in ticketAction');

            reject(error);
            
        }

    })

}

module.exports = ticketAction;