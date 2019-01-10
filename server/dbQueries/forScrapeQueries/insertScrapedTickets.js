const ticket_db = require('../../database/collections/tickets/ticket_model');
const logger = require('../../logger/loggerSettings')();
const userAcc = require('../../account').userAccount;




/**
 * Inserts the scraped data to database and removes preexisting ones that has same date of extraction
 * @param {Array} data 
 */
function insertScrapedTickets(data){
    
    return new Promise(async (resolve, reject)=>{

        try {

            const date = new Date(Date.now()).toLocaleDateString();

            const database = await ticket_db();

            const user_acc = userAcc();

            await database.remove({user_id: user_acc.id})
            .then(data=>{
                logger.trace('removed successfully the old details of the ticket', data)
            })
            .catch(err=>{
                logger.error( err,'Issue removing old details of the ticket');
            });

            await database.insertMany(data)
            .then(data=>{
                logger.info('saved successfully the new details of the ticket', data)
            })
            .catch(err=>{
                logger.error(err, 'Issue on saving the new details of the tickets');
            });

            resolve();

        }catch(err){

            logger.error(err, 'An issue occured while trying to save the data');

            reject(err);

        }

    });
    

}


module.exports = insertScrapedTickets;

