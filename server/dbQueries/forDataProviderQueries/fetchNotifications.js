const notificationModel = require('../../database/collections/notifications/notifications');
const logger = require('../../logger/loggerSettings')();
const { userAccount } = require('../../account');

/**
 * Queries from the database all the ticket notifications for user
 */
async function fetchNotification(){

    return new Promise( async(resolve, reject) => {

        try {

            const priorityCon = await notificationModel();
            const user_account = await userAccount();

            priorityCon.aggregate([
                {$lookup: {
                    from: 'usr_tckts',
                    let: {ticket_id: '$ticket_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$$ticket_id', '$tckt_nmbr']}}}
                    ],
                    as: 'ticket_details'
                }},
                {$unwind: '$ticket_details'},
                {$lookup: {
                    from: 'tckt_priorities',
                    let: {priority_id: '$ticket_details.ticket_priority_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$_id', '$$priority_id']}}}
                    ],
                    as: 'priority'
                }},
                {$unwind: '$priority'},
                {$lookup: {
                    from: 'applications',
                    let: {app_id: '$ticket_details.app_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$_id', '$$app_id']}}}
                    ],
                    as: 'application'
                }},
                {$unwind: '$application'},
                {$lookup: {
                    from: 'tckt_statuses',
                    let: {status_id: '$ticket_details.status_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$_id', '$$status_id']}}}
                    ],
                    as: 'status'
                }},
                {$unwind: '$status'},
                {$addFields: {
                    'ticket_details.priority': '$priority.priority_name',
                    'ticket_details.application': '$application.app_name',
                    'ticket_details.status': '$status.status_name'
                }},
                {$project: {
                    notif_id: 1,
                    ticket_id: 1,
                    time_acknowledged: 1,
                    notification: 1,
                    time_prompted: 1, 
                    ticket_details: 1,
                    user_id: '$ticket_details.user_id'
                }},
                {$match: {user_id: user_account.id || '5bd6221d4dade63138a5c0c5'}},
                {$group: {
                    _id: '$ticket_id',
                    notifications: {$push: {
                        notif:'$notification',
                        notif_id: '$notif_id'
                    }},
                    ticket_details: {$first: '$ticket_details'}
                }}
            ])
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, 'An issue occured in fetchNotification');

                reject(err);

            });
            

        } catch (error) {
            
            logger.error(error, 'An issue occured in fetchNotification');

            reject(error);
            
        }

    });

}

module.exports = fetchNotification;