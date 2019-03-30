const logger = require('../../logger/loggerSettings')();
let updated_data = [];

/**
 * Stores / cache the updated data ticket that needs to be scraped one by one
 */
function StoreUpdatedData(data){

    return new Promise((resolve, reject) => {

        try {

            updated_data = data;

            resolve();
            
        } catch (error) {
            
            logger.error(error, 'An issue occured in StoreUpdatedData');

            reject(error);

        }

    });

}

/**
 * Data getter for the stored newly updated tickets that are needed for thorough checking
 */
async function StoredDataGetter(){

    return await updated_data;

}


module.exports = StoreUpdatedData;
module.exports.updated_data = StoredDataGetter;