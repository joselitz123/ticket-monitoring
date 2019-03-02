const logger = require('../logger/loggerSettings')();
const inserNotification = require('../dbQueries/notificationLogicQueries/insertNotification');
const fetchResolvedTickets = require('../dbQueries/notificationLogicQueries/fetchResolvedTickets');
const moment = require('moment-business-days');

/**
 * Evaluates the new resolved tickets
 * @param {Array} notif_types - the noticafication types for which to use the id
 */
function resolvedTicketNotification(notif_types) {

    return new Promise( async(resolve, reject) => {

        try {
            
            const variables = await fetchResolvedTickets();
            
            const notifId = notif_types.find(notifType => notifType.notif_type == 'ticket_resolved').id;

            const result = variables.reduce((acc, cur) => {

                const { tckt_nmbr, ticket_status } = cur;

                if (ticket_status == "Resolved") {
                    
                    const data = {
                        ticket_id: tckt_nmbr,
                        notification: `Is has now been set to resolved, please check for any action needed`,
                        notif_id: notifId,
                        time_prompted: moment()
                    }

                    return [...acc, data];

                }else if (ticket_status == "Completed") {

                    const data = {
                        ticket_id: tckt_nmbr,
                        notification: `Is now been set to completed, please double check for any action needed`,
                        notif_id: notifId,
                        time_prompted: moment()
                    }
                    
                    return [...acc, data];
                }
                
            }, []);

            inserNotification(result, notifId);
        
            resolve();
        
        } catch (error) {
    
            logger.error(error, 'An issue occured in resolvedTicketNotification');
    
            reject();
            
        }

    });

}

module.exports = resolvedTicketNotification;