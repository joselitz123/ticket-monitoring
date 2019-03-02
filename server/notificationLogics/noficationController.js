const logger = require('../logger/loggerSettings')();
const notificationTypes = require('./notificationTypes');
const ticketNextUpdateEvaluator = require('./ticketNextUpdateEvaluator');
const resolvedTicketNotification = require('./resolvedTicketNotification');
const autoTicketNotification = require('./autoTicketNotification');
const newHighPriorityTicketNotif = require('./newHighPriorityTicketNotif');
const ticketAssignedtoGroupNotif = require('./ticketAssignedtoGroupNotif');

/**
 * Controller for the notfication
 */
function notificationController() {

    return new Promise( async(resolve, reject) => {

        try {

            const notif_types = await notificationTypes();

            await Promise.all([
                ticketNextUpdateEvaluator(notif_types),
                resolvedTicketNotification(notif_types),
                autoTicketNotification(notif_types),
                newHighPriorityTicketNotif(notif_types),
                ticketAssignedtoGroupNotif(notif_types)
            ]);

            resolve();
            
        } catch (error) {

            logger.error(error, 'An issue occured in notificationController');

            reject(error);
            
        }

    })

}

module.exports = notificationController;