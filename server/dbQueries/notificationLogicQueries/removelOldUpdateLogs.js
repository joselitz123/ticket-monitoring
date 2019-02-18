const updateLogModel = require('../../database/collections/tckt_update_log/tckt_update_log');
const logger = require('../../logger/loggerSettings')();


/**
 * Removes the old update logs from ticket update log document
 * @param {Array} tickets  - tickets to be removed
 */
function removeOldUpdateLogs(tickets) {

    return new Promise( async(resolve, reject) => {

        try {

            const updateLogCon = await updateLogModel();

            updateLogCon.remove(
                {
                    ticket_id: tickets
                }
            )
            .then(data => {

                resolve();

            })
            .catch(err => {

                logger.error(err, 'An error occured in removeOldUpdateLogs');

                reject();

            });
            
        } catch (error) {
            
            logger.error(error, 'An error occured in removeOldUpdateLogs');

            reject();

        }

    })

}

module.exports = removeOldUpdateLogs;