const logger = require('../../logger/loggerSettings')();
const ticketModel = require('../../database/collections/tickets/ticket_model');
const { userAccount } = require('../../account');

/**
 * Fetches the resolved tickets from the database
 */
function fetchResolvedTickets() {

    return new Promise( async(resolve, reject) => {

        try {

            const ticketCon = await ticketModel();

            const userAcc = userAccount();

            ticketCon.aggregate([
                {$lookup: {
                    from: 'applications',
                    let: {app_id: '$app_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$_id', '$$app_id']}}}
                    ],
                    as: 'application'
                }},
                {$unwind: '$application'},
                {$lookup: {
                    from: 'tckt_priorities',
                    let: {ticket_priority_id: '$ticket_priority_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$_id', '$$ticket_priority_id']}}}
                    ],
                    as: 'priority'
                }},
                {$unwind: '$priority'},
                {$lookup: {
                    from: 'tckt_update_logs',
                    let: {ticket_number: '$tckt_nmbr'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$ticket_id', '$$ticket_number']}}},
                        {$sort: {date_updated: -1}},
                        {$limit: 1},
                        {$project: {ticket_id: 0}}
                    ],
                    as: 'ticket_update'
                }},
                {$unwind: '$ticket_update'},
                {$lookup: {
                    from: 'tckt_statuses',
                    let: {status_id: '$status_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$_id', '$$status_id']}}}
                    ],
                    as: 'ticket_status'
                }},
                {$unwind: '$ticket_status'},
                {$project: {
                    tckt_nmbr: 1,
                    task_type: 1,
                    ass_to: 1,
                    ass_group: 1,
                    shrt_desc: 1,
                    auto_tckt: 1,
                    updated_by: 1,
                    ticket_update: 1,
                    application: '$application.app_name',
                    priority: '$priority.priority_name',
                    update_interval: '$priority.update_interval',
                    divide_time: '$ticket_status.divide_time',
                    ticket_status: '$ticket_status.status_name'
                }},
                {$match: {
                    user_id: userAcc.id || "5c11fafa75036730e47d0ce8",
                    ticket_status: 'Completed' || 'Resolved'
                }},
            ])
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, 'An issue occured in fetchResolvedTickets');
            
                reject();

            })

        } catch (error) {

            logger.error(error, 'An issue occured in fetchResolvedTickets');
            
            reject();

        }

    })

}

module.exports = fetchResolvedTickets;