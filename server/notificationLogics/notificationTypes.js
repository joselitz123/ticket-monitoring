const fetchNotificationQuery = require('../dbQueries/notificationLogicQueries/fetchNotificationTypes');
const logger = require('../logger/loggerSettings')();
let notificationTypes = [];

/**
 * Return the notification types that was stored in the cache
 */
function getNotificationTypes() {

    return new Promise( async(resolve, reject) => {

        try {            

            if (notificationTypes.length == 0) {

                const result = await fetchNotificationQuery();

                notificationTypes = result;

                resolve(notificationTypes);

            }else{

                resolve(notificationTypes);

            }
            
        } catch (error) {

            logger.error(error, 'An issue occured in getNotificationTypes');

            reject(error);
            
        }
        
    });

}

module.exports = getNotificationTypes;