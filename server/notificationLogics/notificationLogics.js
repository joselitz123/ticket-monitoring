const fetchTicketsByPriority = require('../dbQueries/notificationLogicQueries/fetchTicketsByPriority');
const logger = require('../logger/loggerSettings')();

// Runs the logic for prompting the notification to the user
function notificationLogic() {

    return new Promise((resolve, reject) => {

        try {
            
            const result = fetchTicketsByPriority();

            result.reduce((total_tckts, current_tckt) => {

                

            });

            resolve();

        } catch (error) {
            
            logger.error(error, 'An issue occured in notificationLogic');

            reject();

        }

    });


}

module.exports = notificationLogic;