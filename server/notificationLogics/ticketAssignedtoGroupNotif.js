const logger = require('../logger/loggerSettings')();
const fetchNonCompletedTickets = require('../dbQueries/notificationLogicQueries/fetchNonCompletedTickets');
const moment = require('moment-business-days');

/**
 * Checkes for any ticket that is newly assigned to biops
 * @param {Array} notif_types - the noticafication types for which to use the id
 */
function ticketAssignedtoGroupNotif(notif_types) {

    return new Promise( async(resolve, reject) => {

        try {
            
            const variables = await fetchNonCompletedTickets();
            
            const notifId = notif_types.find(notifType => notifType.notif_type == 'ticket_resolved').id;

            const result = variables.reduce((acc, cur) => {

                const { tckt_nmbr } = cur;

                const data = {
                    ticket_id: tckt_nmbr,
                    notification: `Is now currently assigned to your team`,
                    notif_id: notifId,
                    time_prompted: moment()
                }

                return [...acc, data];

            }, []);
        
            resolve(result);
        
        } catch (error) {
    
            logger.error(error, 'An issue occured in ticketAssignedtoGroupNotif');
    
            reject(error);
            
        }

    });

}

module.exports = ticketAssignedtoGroupNotif;