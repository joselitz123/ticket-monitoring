const ticket_model = require('../../database/collections/tickets/ticket_model');
const logger = require('../../logger/loggerSettings')();
const { ObjectID } = require('mongodb');
const User = require('../../account').userAccount;

/**
 * Returns the tickets of a certain application
 * @param {*} app_id application ID
 */
function appTicketsQuery (app_id){    

    return new Promise( async(resolve, reject)=>{

        try {

            const ticketModelCon = await ticket_model();

            const app_ObjectID = ObjectID(app_id);

            const userID = User();

            ticketModelCon.aggregate([
                {$match: {$and: [{app_id: app_ObjectID}, {user_id: userID.id}]}},
                {$lookup: {
                    from: 'tckt_priorities',
                    let: {priority_id: '$ticket_priority_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$$priority_id', '$_id' ]}}}
                    ],
                    as: "priority"
                }},
                {$unwind: '$priority'},
                {$addFields: {priority: '$priority.priority_name'}},
                {$lookup: {
                    from: 'tckt_statuses',
                    let: {status_id: '$status_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$$status_id', '$_id']}}}
                    ],
                    as: "status"
                }},
                {$unwind: '$status'},
                {$addFields: {status: '$status.status_name'}},
                {$project: {created_at: 0, ticket_priority_id: 0, auto_tckt: 0, __v: 0, app_id: 0, status_id: 0}}
            ])
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, "Error query in appTicketsQuery");

            })
            
        } catch (error) {

            logger.error(error, "An issue occured while running App tickets query", error);

            reject();
            
        }

    });

}

module.exports = appTicketsQuery;