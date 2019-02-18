const logger = require('../../logger/loggerSettings')();
const forActionTicketModel = require('../../database/collections/for_action_tickets/for_action_tickets');
const { userAccount } = require('../../account');

/**
 * Fetches the tickets that the user has in the for action ticket table
 */
function fetchForActionTicketPerUser() {

    return new Promise( async(resolve, reject) => {

        try {

            const forActionTicketCon = await forActionTicketModel();

            const user = userAccount();

            forActionTicketCon.aggregate([
                {$lookup: {
                    from: 'usr_tckts',
                    let: {ticket_id: '$ticket_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$tckt_nmbr', '$$ticket_id']}}},
                        {$sort: {time_prompted: -1}},
                        {$limit: 1}
                    ],
                    as: 'ticket'
                }},
                {$unwind: '$ticket'},
                {$project: {
                    ticket_id: 1,
                    date_last_updated: 1,
                    date_to_update: 1,
                    is_acknowledged: 1,
                    time_prompted: 1,
                    user_id: '$ticket.user_id'
                }},
                {$match: {user_id: user.id || '5bd6221d4dade63138a5c0c5'}},
                // {$limit: 1}
            ])
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, "An issue occured in fetchForActionTicketPerUser");

                reject();
                
            })
            
        } catch (error) {

            logger.error(error, "An issue occured in fetchForActionTicketPerUser");

            reject();
            
        }

    })

}

module.exports = fetchForActionTicketPerUser;