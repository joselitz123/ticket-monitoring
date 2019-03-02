const logger = require('../logger/loggerSettings')();
const fetchHigherPriorityTicket = require('../dbQueries/notificationLogicQueries/fetchHighPriorityTickets');
const inserNotification = require('../dbQueries/notificationLogicQueries/insertNotification');

function newHigherPriorityTicketNotif(notif_types) {

    return new Promise( async(resolve, reject) => {

        try {

            const higherPriorityTickets = await fetchHigherPriorityTicket();

            const notifId = notif_types.find(notifType => notifType.notif_type == 'high_ticket').id;

            const result = higherPriorityTickets.reduce((acc, cur) => {

                const { tckt_nmbr, ticket_status, ticket_priority }  = cur;

                const data = {
                    ticket_id: tckt_nmbr,
                    notification: `Is now set to ${ticket_priority} priority and is in ${ticket_status} status`,
                    notif_id: notifId,
                    time_prompted: moment()
                }

                return [...acc, data];

            }, []);

            inserNotification(result, notifId);

            resolve();
            
        } catch (error) {

            logger.error(error, 'An issue occured in newHigherPriorityTicketNotif');

            reject();
            
        }

    })

}

module.exports = newHigherPriorityTicketNotif;