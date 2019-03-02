const logger = require('../../logger/loggerSettings')();
const ticketModel = require('../../database/collections/tickets/ticket_model');
const { userAccount } = require('../../account');

/**
 * Fetches all the autotickets from the database
 */
function fetchAutoTickets() {

    return new Promise( async(resolve, reject) => {

        try {

            const ticketCon = await ticketModel();

            const userAcc = await userAccount();

            ticketCon.find({user_id: userAcc.id || "5c11fafa75036730e47d0ce8", auto_tckt: true})
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, 'An issue occured in fetchAutoTickets');

                reject();
                
            })
            
        } catch (error) {
            
            logger.error(error, 'An issue occured in fetchAutoTickets');

            reject();

        }

    })

}

module.exports = fetchAutoTickets;