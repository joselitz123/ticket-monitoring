const ticket_db = require('../../database/collections/tickets/ticket_model');
const logger = require('../../logger/loggerSettings')();
const userAcc = require('../../account').userAccount;
const _ = require('lodash');
const StoreUpdatedData = require('../../cachedData/updatedData/updatedData');
const fetchFullTicketDetail = require('./fetchFullTicketDetail');


/**
 * Inserts the scraped data to database and removes preexisting ones that has same date of extraction and returns 
 * of what it inserted
 * @param {Array} data 
 */
function insertScrapedTickets(data){
    
    return new Promise(async (resolve, reject)=>{

        try {

            const database = await ticket_db();

            const user_acc = await userAcc();

            const oldData = await fetchFullTicketDetail();

            await database.deleteMany({user_id: user_acc.id})
            .catch(err=>{
                logger.error( err,'Issue removing old details of the ticket');
                reject(err);
            });

            await database.insertMany(data)
            .catch(err=>{

                logger.error(err, 'Issue on saving the new details of the tickets');
                reject();

            });

            const newData = await fetchFullTicketDetail();
            const changedData = await _.differenceWith(newData, oldData, _.isEqual);

            await StoreUpdatedData(changedData);

            resolve();

        }catch(err){

            logger.error(err, 'An issue occured while trying to save the data');

            reject(err);

        }

    });
    

}


module.exports = insertScrapedTickets;

