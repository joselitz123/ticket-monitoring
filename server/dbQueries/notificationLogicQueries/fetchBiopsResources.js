const biopsResourcesModel = require('../../database/collections/biops_resources/biops_resources');
const logger = require('../../logger/loggerSettings')();


/**
 * Returns the list of Biops resources.
 */
function fetchBiopsResources() {

    return new Promise(async(resolve, reject) => {

        try {

            const biopsResourcesCon = await biopsResourcesModel();

            biopsResourcesCon.find()
            .then(data => {

                resolve(data);

            })
            .catch(err => {

                logger.error(err, 'An issue occured in fetchBiopsResources');

                reject();

            })
            
        } catch (error) {
            
            logger.error(error, 'An issue occured in fetchBiopsResources');

            reject();

        }

    });

}

module.exports = fetchBiopsResources;