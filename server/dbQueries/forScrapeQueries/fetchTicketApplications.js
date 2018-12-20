const logger = require('../../logger/loggerSettings')();
const application_model = require('../../database/collections/applications/applications_model');

let ticketApplications = []; //contains list of cached ticket priorities from database


/** 
 * Fetches the list of applications from the database and returns it if already fetched before for easy caching
 */
function fetchTicketApplication(){

    return new Promise(async (resolve, reject)=>{
        
        try {
            if (ticketApplications.length > 0) {
                

                resolve(ticketApplications);
                

            }else{

                const applicationModel = await application_model();

                applicationModel.find()
                .then(data=>{
                    logger.trace('Fetched from DB the applications', data);
                    ticketApplications = data;
                    resolve(ticketApplications);
                })
                .catch(err=>{
                    logger.error(err,'Issue while fetching the applications');
                    reject();
                })

            }

        } catch (error) {
            
            logger.error(error,'Issue occured while running query for list of applications');
            reject();

        }

    })

}

module.exports = fetchTicketApplication;