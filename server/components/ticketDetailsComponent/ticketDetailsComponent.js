const logger = require('../../logger/loggerSettings')();
const ticketDetailQuery = require('../../dbQueries/forDataProviderQueries/ticketDetails');


/**
 * 
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const ticketDetailsComponent = async(req, res) => {

        try {

            const ticket = req.params.ticket_id;

            console.log(ticket);

            const result = await ticketDetailQuery(ticket);

            res.status(200).send({ data: result });
            
        } catch (error) {

            logger.error(error, 'An issue occurred in ticketDetailsComponent');

            res.status(500);

        }

}

module.exports = ticketDetailsComponent;