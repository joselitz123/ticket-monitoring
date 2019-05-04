const logger = require('../../logger/loggerSettings')();
const ticketModel = require('../../database/collections/tickets/ticket_model');
const user = require('../../account').userAccount;

/**
 * returns the ticket details
 * @param {String} ticket - Ticket number to fetch the detail
 */
function ticketDetails(ticket) {

    return new Promise(async (resolve, reject) => {

        try {

            const User = user();

            const ticketCon = await ticketModel();

            ticketCon.aggregate([
                { $match: { $and: [{ tckt_nmbr: ticket }, { user_id: User.id || '5bd6221d4dade63138a5c0c5' }] } },
                {
                    $lookup: {
                        from: 'applications',
                        let: { app_id: '$app_id' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$$app_id', '$_id'] } } }
                        ],
                        as: 'application'
                    }
                },
                {
                    $lookup: {
                        from: 'tckt_statuses',
                        let: { status_id: '$status_id' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$$status_id', '$_id'] } } }
                        ],
                        as: 'status'
                    }
                },
                {
                    $lookup: {
                        from: 'tckt_priorities',
                        let: { priority_id: '$ticket_priority_id' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$$priority_id', '$_id'] } } }
                        ],
                        as: 'priority'
                    }
                },
                { $unwind: '$application' },
                { $unwind: '$status' },
                { $unwind: '$priority' },
                {
                    $addFields: {
                        application: '$application.app_name',
                        status: '$status.status_name',
                        priority: '$priority.priority_name'
                    }
                },
                { $project: { app_id: 0, __v: 0, status_id: 0, ticket_priority_id: 0, user_id: 0 } }
            ]).then(data => {

                resolve(data);

            }).catch(err => {

                logger.error(err, 'An issue occured in ticketDetails');

                reject(err);

            })

        } catch (error) {

            logger.error(error, 'An issue occured in ticketDetails');

            reject(error);

        }

    })

}

module.exports = ticketDetails;