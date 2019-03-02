const ticketModel = require('../../database/collections/tickets/ticket_model');
const logger = require('../../logger/loggerSettings')();
const { userAccount } = require('../../account');

/**
 * Fetches the non completed or non resolved tickets that are assigned to BIOPS
 * 
 */
function fetchNonCompletedTickets(data) {

    return new Promise( async(resolve, reject) => {

        try {
            
            const ticketCon = await ticketModel();

            const userAcc = userAccount();

            await ticketCon.aggregate([
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
                    status_status: '$ticket_status.status_name',
                    user_id: 1,
                    tckt_nmbr: 1,
                    ass_group: 1
                }},
                {$match: {
                    $and: [
                        {user_id: userAcc.id || "5c11fafa75036730e47d0ce8"},
                        {ass_group: 'HPE_BI_BIOPS_L1'}
                    ]
                }}
            ])
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, 'An error occured in fetchNonCompletedTickets');

                reject(err);

            });

        } catch (error) {
            
            logger.error(error, 'An error occured in fetchNonCompletedTickets');

            reject(err);

        }

    });

}

module.exports = fetchNonCompletedTickets;