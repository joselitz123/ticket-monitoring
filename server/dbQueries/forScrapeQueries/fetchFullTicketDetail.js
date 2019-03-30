const ticketModel = require('../../database/collections/tickets/ticket_model');
const logger = require('../../logger/loggerSettings')();
const { userAccount } = require('../../account');

/**
 * Fetches the ticket's full details from its related tables
 */
function fetchFullTicketDetail() {

    return new Promise( async(resolve, reject) => {

        try {

            const ticketCon = await ticketModel();

            const user = userAccount();

            ticketCon.aggregate([
                {$match: {user_id: user.id || '5c7e2e2f1f353e05f496ae40'}},
                {$lookup: {
                    from: 'applications',
                    let: {app_id: '$app_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$$app_id', '$_id']}}}
                    ],
                    as: 'application'
                }},
                {$unwind: '$application'},
                {$lookup: {
                    from: 'tckt_statuses',
                    let: {status_id: '$status_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$$status_id', '$_id']}}}
                    ],
                    as: 'status'
                }},
                {$unwind: '$status'},
                {$lookup: {
                    from: 'tckt_priorities',
                    let: {priority_id: '$ticket_priority_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$$priority_id', '$_id']}}}
                    ],
                    as: 'priority'
                }},
                {$unwind: '$priority'},
                {$project: {
                    _id: 0,
                    updated_at: 1,
                    tckt_nmbr: 1,
                    task_type: 1,
                    conf_item: 1,
                    ass_to: 1,
                    ass_group: 1,
                    shrt_desc: 1,
                    auto_tckt: 1,
                    updated: 1,
                    updated_by: 1,
                    application: '$application.app_name',
                    status: '$status.status_name',
                    priority: '$priority.priority_name',
                }}
            ])
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, 'An issue occured in fetchFullTicketDetail');

                reject(err);

            })

            
        } catch (error) {

            logger.error(error, 'An issue occured in fetchFullTicketDetail');

            reject(error);
            
        }

    })

}

module.exports = fetchFullTicketDetail;