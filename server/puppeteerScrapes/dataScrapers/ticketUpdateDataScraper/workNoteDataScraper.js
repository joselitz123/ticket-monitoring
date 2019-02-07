const biops_resource_model = require('../../../dbQueries/notificationLogicQueries/fetchBiopsResources');
const logger = require('../../../logger/loggerSettings')();
const cheerio = require('cheerio');

let biops_resources = []; // Declared outside from function for caching

/**
 * Extracts and returns the relevant data from the DOM object
 * @param {*} DOMObject - DOM content
 */
function workNoteDataScraper(DOMObject) {

    return new Promise( async(resolve, reject) => {

        try {

            if(biops_resources.length == 0) {

                biops_resources = await biops_resource_model();
                
            }

            const $ = await cheerio.load(DOMObject);

            const activity_dom = await $('.section-content .activity-detail .activity_header');

            const activity_date = [];

            activity_dom.each( (i, el) =>{

                const user = $(el).find('.user').text();
                const update = $(el).find('.activity_date').text();

                const updateFromResource = biops_resources.filter(element => element.resource_name == user);

                const hasWorknote = $(el).next('.activity_data').find('.activity_field[name="work_notes"]').html() == null ? false : true;

                const worknoteContent = $(el).next('.activity_data').find('.activity_field[name="work_notes"]').html();

                if (updateFromResource.length != 0 && hasWorknote == true) {
                    
                    activity_date.push({
                        ticket_id: 'INC2536834',
                        date_of_update: update,
                        resource_id: updateFromResource[0]._id,
                        worknote_content: worknoteContent
                    });

                    return false;

                }

            });

            resolve(activity_date);

        } catch (error) {

            logger.error(error, 'An issue occured in workNoteDataScraper function');
            
            reject();

        }

    })

}

module.exports = workNoteDataScraper;