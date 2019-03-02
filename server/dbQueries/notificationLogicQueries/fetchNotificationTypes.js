const logger = require('../../logger/loggerSettings')();
const notifTypesModel = require('../../database/collections/notif_types/notif_types');

/**
 * Returns the notification types
 */
function fetchNotificationTypes() {

    return new Promise( async(resolve, reject) => {

        try {

            const notifTypesCon = await notifTypesModel();

            notifTypesCon.find()
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err,'An issue occured in fetchNotificationTypes');

                reject(err);

            })
            
        } catch (error) {

            logger.error(error, 'An issue occured in fetchNotificationTypes');

            reject(error);
            
        }

    })

}

module.exports = fetchNotificationTypes;