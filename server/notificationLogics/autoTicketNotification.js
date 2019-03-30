const logger = require('../logger/loggerSettings')();
const fetchAutoTickets = require('../dbQueries/notificationLogicQueries/fetchAutoTickets');
const moment = require('moment-business-days');

/**
 * Notificaiton evaluator for autotickets
 * @param {*} notifType 
 */
function autoTicketNotification(notif_types) {

    return new Promise( async(resolve, reject) => {

        try {

            const data = await fetchAutoTickets();

            const notifId = notif_types.find(notifType => notifType.notif_type == 'new_auto_ticket').id;

            const result = data.reduce((acc, cur) => {

                const { tckt_nmbr } = cur;

                const data = {
                    ticket_id: tckt_nmbr,
                    notification: `This new autoticket is now assigned to you`,
                    notif_id: notifId,
                    time_prompted: moment()
                }

                return [...acc, data];

            }, []);

            resolve(result);
            
        } catch (error) {

            logger.error(error, 'An issue occured in autoTicketNotification');

            reject();
            
        }

    })

}

module.exports = autoTicketNotification;