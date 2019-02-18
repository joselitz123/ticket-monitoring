const updateLogModel = require('../../database/collections/tckt_update_log/tckt_update_log');
const logger = require('../../logger/loggerSettings')();
const { ObjectID } = require('mongodb');

/**
 * Inserts the update logs to database
 * @param {Array} data - Array Data to be inserted
 * 
 */
function insertTicketUpdateLogs(data) {

    return new Promise( async(resolve, reject) => {

        try {
            
            const updateLogCon = await updateLogModel();

            await updateLogCon.insertMany(data)
            .then(data => {

                resolve();

            })
            .catch(err => {

                logger.error(err, 'An error occured in insertTicketUpdateLogs');

                reject();

            });

        } catch (error) {
            
            logger.error(error, 'An error occured in insertTicketUpdateLogs');

            reject();

        }

    });

}

module.exports = insertTicketUpdateLogs;