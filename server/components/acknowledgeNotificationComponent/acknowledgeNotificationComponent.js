const acknowledgeNotificationQuery = require('../../dbQueries/dataModifierQueries/acknowledgeNotifcationQuery');
const logger = require('../../logger/loggerSettings')();

/**
 * Component for acknowledging notification
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
async function acknowledgeNotificationComponent(req, res) {

    try {

        const notif_id = req.params.notif_id;
        

        const result = await acknowledgeNotificationQuery(notif_id);

        res.status(200).send(JSON.stringify(result));
        
    } catch (error) {

        logger.error(error, 'An issue occurred in acknowledgeNotificationComponent');

        res.status(500).send();
        
    }

}

module.exports = acknowledgeNotificationComponent;