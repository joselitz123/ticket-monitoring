const logger = require('../../logger/loggerSettings')();
const tickets_query = require('../../dbQueries/forDataProviderQueries/appTickets');


 /**
  *
 * Sends responds to the app ticket query
  * @param {*} req request object
  * @param {*} res response object
  */
async function PerAppTicketComponent(req, res){

    try {

        const app_id = req.params.app_id;

        const app_tickets = await tickets_query(app_id);

        res.status(200).send({data: app_tickets});
        
    } catch (error) {

        logger.error(error, "An issue occured while running PerAppTicketComponent function");

        reject(error);
        
    }

}

module.exports = PerAppTicketComponent;