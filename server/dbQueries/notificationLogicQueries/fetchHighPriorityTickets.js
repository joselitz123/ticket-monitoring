const logger = require('../../logger/loggerSettings')();
const ticketModel = require('../../database/collections/tickets/ticket_model');
const { userAccount } = require('../../account');

/**
 * Queries out the new higher priority ticket
 */
function fetchHighPriorityTickets() {

    return new Promise( async(resolve, reject) => {

        try {

            const ticketCon = await ticketModel();

            const userAcc = userAccount();

            ticketCon.aggregate([
                {$lookup: {
                    from: 'tckt_priorities',
                    let: {ticket_priority_id: '$ticket_priority_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$$ticket_priority_id', '$_id']}}}
                    ],
                    as: 'ticket_priority'
                }},
                {$unwind: '$ticket_priority'},
                {$lookup: {
                    from: 'tckt_statuses',
                    let: {status_id: '$status_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$$status_id', '$_id']}}}
                    ],
                    as: 'ticket_status'
                }},
                {$unwind: '$ticket_status'},
                {$project: {
                    tckt_nmbr: '$tckt_nmbr',
                    user_id: 1,
                    ticket_priority: '$ticket_priority.priority_name',
                    ticket_status: '$ticket_status.status_name'
                }},
                {$match: {
                    $and: [
                        {user_id: userAcc.id || '5bd6221d4dade63138a5c0c5'},
                        {$or: [
                            {ticket_priority: '2 - High'},
                            {ticket_priority: '1 - Critical'}
                        ]}
                    ]
                }}
            ])
            .then( data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, 'An issue occured in fetchHighPriorityTickets');

                reject();

            })
            
        } catch (error) {

            logger.error(error, 'An issue occured in fetchHighPriorityTickets');

            reject();
            
        }

    })

}

module.exports = fetchHighPriorityTickets;