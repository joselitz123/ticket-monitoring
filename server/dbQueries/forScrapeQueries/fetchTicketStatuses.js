const logger = require('../../logger/loggerSettings')();
const ticket_status_model = require('../../database/collections/ticket_status/ticket_status');

/**
 *  Performs Select all data query in ticket statuses database model and return the data
 */
function fetTicketStatuses(){

    return new Promise( async(resolve, reject)=>{

        try {

            const ticket_status_con = await ticket_status_model();

            ticket_status_con.find()
            .then((data) => {

                resolve(data);

            })
            .catch(err => {
                
                logger.error(err, "An issue occured while fetching ticket status");

                reject();

            })
            
        } catch (error) {
            
            logger.error(error, "An issue occured while fetching ticket status");

            reject();

        }

    });

}


module.exports = fetTicketStatuses;