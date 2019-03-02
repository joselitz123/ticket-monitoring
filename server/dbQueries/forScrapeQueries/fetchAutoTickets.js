const logger = require('../../logger/loggerSettings')();
const ticket_db = require('../../database/collections/tickets/ticket_model');



/**
 * Gets all the auto tickets
 * @param {Object} userData - user's object information
 */
function getAutoTickets(userData){

    return new Promise( async(resolve, reject)=>{

        try {

            const ticket_model = await ticket_db();
    
            const recent_date = await ticket_model.aggregate([
                {$match: {user_id: String(userData._id)}},
                {$group: {
                    _id: null,
                    max: {$max: '$created_at'}
                }},
            ]);
    
            logger.trace('Fetched data from the query getAutoTickets', recent_date);
    
            if (recent_date.length != 0 ) {
    
                const converted_date = new Date(recent_date[0].max).toISOString();
    
                await ticket_model.find({
                        user_id: userData._id,
                        created_at: converted_date,
                        auto_tckt: true
                    })
                    .select('tckt_nmbr')
                    .exec((err, doc)=>{
                        if (err) {
                            logger.error(err, 'Issue occured while getting auto tickets from database');
                        }
                        resolve(doc);
                    });
            }else{
    
                resolve([]);
    
            }
            
        } catch (error) {
            
            logger.error(error, 'Issue occured while running the database query for auto tickets');

            reject();
    
        }

    });

}

module.exports = getAutoTickets;