const fetchTicketUpdates = require('../../dbQueries/forDataProviderQueries/fetchTicketUpdates');
const logger = require('../../logger/loggerSettings')();

const ticketUpdateLogs = async (req, res) => {

    try {

        const ticket_id = req.params.ticket_id;

        const result = await fetchTicketUpdates(ticket_id);

        res.status(200).send(result);

    } catch (error) {

        logger.error(error, 'An issue occured in ticketUpdateLogs');

    }

}

module.exports = ticketUpdateLogs;
