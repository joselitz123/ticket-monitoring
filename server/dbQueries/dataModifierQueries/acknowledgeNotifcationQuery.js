const notif_model = require('../../database/collections/notifications/notifications');
const logger = require('../../logger/loggerSettings')();
const moment = require('moment-business-days');

/**
 * Acknowledges a notification
 * @param {String} notif_id - id of the notification to mark as acknowledged
 */
function acknowledgeNotificationQuery(notif_id) {

    return new Promise(async (resolve, reject) => {

        try {

            const notifCon = await notif_model();

            notifCon.updateOne(
                { _id: notif_id },
                {time_acknowledged: moment()}
            )
            .then((data)=>{

                resolve(data);

            })
            .catch(err => {

                logger.error(err, 'An issue occurred in acknowledgeNotificationQuery')

                reject(err);

            })

        } catch (error) {

            logger.error(error, 'An issue occurred in acknowledgeNotificationQuery')

            reject(error);

        }

    })

}

module.exports = acknowledgeNotificationQuery;