const ticketModel = require('../../database/collections/tickets/ticket_model');
const userObject = require('../../account');
const logger = require('../../logger/loggerSettings')();

/**
 * Fetches the ticket that is ordered by priority
 */
function fetchTicketsByPriority() {

    return new Promise( async(resolve, reject) => {

        try {

            const ticketCon = await ticketModel();
    
        
            ticketCon.aggregate([
                {$match: {user_id: '5bd6221d4dade63138a5c0c5'}},
                {$lookup: {
                    from: 'applications',
                    let: {app_id: '$app_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$_id', '$$app_id']}}}
                    ],
                    as: 'application'
                }},
                {$unwind: '$application'},
                {$addFields: {
                    application: '$application.app_name'
                }},
                {$lookup: {
                    from: 'tckt_priorities',
                    let: {ticket_priority_id: '$ticket_priority_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$_id', '$$ticket_priority_id']}}}
                    ],
                    as: 'priority'
                }},
                {$unwind: '$priority'},
                {$addFields: {
                    priority: '$priority.priority_name',
                    update_interval: '$priority.update_interval'
                }},
                {$project: {
                    tckt_nmbr: 1,
                    priority: 1,
                    update_interval: 1,
                    application: 1,
                    updated: 1,
                    updated_by: 1
                }},
                {$sort: {priority: 1}}
            ])
            .then(data => {
                
                resolve(data);
                
            })
            .catch(err => {
                
                logger.error(err, 'An issue occured in fetchTicketsByPriority function')

            });
            
        } catch (error) {
            
            logger.error(error, 'An issue occured in fetchTicketsByPriority function');

            reject()

        }

    }); 

}

module.exports = fetchTicketsByPriority;