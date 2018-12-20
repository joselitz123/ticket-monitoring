const priorityModel = require('../../database/collections/ticket_priorities/ticket_priority_model');
const logger = require('../../logger/loggerSettings')();
const { userAccount } = require('../../account');

/**
 * Queries for the toal ticket for every ticket priority
 */
async function providePriorityTicketCount(){
        try {
        
        const priorityModelDB = await priorityModel();
            const user_account = await userAccount();

            const result = await priorityModelDB.aggregate([
                {$lookup: {from: 'usr_tckts',
                        let: {id: '$_id'},
                        pipeline: [
                            {$match: {$expr: {$and: [{$eq: ['$user_id', user_account.id]}, {$eq: ['$$id','$ticket_priority_id']}]}}},
                            {$count: 'total'},
                        ],
                        as: 'total_tickets'},
                },
                {$unwind: {path:'$total_tickets',preserveNullAndEmptyArrays: true}},
                {$addFields: {total_tickets: '$total_tickets.total'}}
            ]);

            return result;

    } catch (error) {
        
        logger.error(error, 'An issue occured while querieng for the toal ticket for every ticket priority');
        
    }
}

module.exports = providePriorityTicketCount;