const logger = require('../../logger/loggerSettings')();
const applications_model = require('../../database/collections/applications/applications_model');
const { userAccount } = require('../../account');

/**
 * Queries the total ticket per application for the user
 */
async function AppTicketCount (){

    try {
        const user_account = await userAccount();
    
        const app_con = await applications_model();

        const apps = await app_con.aggregate([
            {$lookup: {
                from: 'usr_tckts',
                let: {id: '$_id'},
                pipeline: [
                    {$match: {$expr: {$and: [{$eq: ['$user_id', user_account.id]}, {$eq: ['$$id', '$app_id']}]}}},
                    {$count: 'total'}, 
                ],
                as: 'total_tickets'
            }},
            {$unwind: '$total_tickets'},
            {$addFields: {total_tickets: '$total_tickets.total'}}
        ]);

        logger.trace('queried all the applications', apps);

        return apps;

        
        
    } catch (error) {
        
        logger.error(error, 'An issue occured while querieng all total ticket per app')

    }

}   

module.exports = AppTicketCount;