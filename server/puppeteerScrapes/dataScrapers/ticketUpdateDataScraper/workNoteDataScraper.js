const biops_resource_model = require('../../../dbQueries/notificationLogicQueries/fetchBiopsResources');
const logger = require('../../../logger/loggerSettings')();
const cheerio = require('cheerio');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

let biops_resources = []; // Declared outside from function for caching

/**
 * Extracts and returns the relevant data from the DOM object
 * returned data contains all the updates from BIOPS
 * @param {*} DOMObject - DOM content
 * 
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
                const ticket_number = $('.navbar-title-display-value').text();

                const updateFromResource = biops_resources.filter(element => element.resource_name == user);

                let worknoteContent = $(el).next('.activity_data').find('.activity_field[name="work_notes"]').html();

                let commentContent = $(el).next('.activity_data').find('.activity_field[name="comments"]').html();

                // const assignment_group = $(el).next('.activity_data').find('.activity_field[name="assignment_group"]').html();

                worknoteContent = worknoteContent != undefined ? _.escape(worknoteContent) : '';                

                commentContent = commentContent != undefined ? _.escape(commentContent) : '';

                if (updateFromResource.length != 0 && worknoteContent != '' || updateFromResource.length != 0 && commentContent != '') {

                    activity_date.push({
                        ticket_id: ticket_number,
                        date_updated: new Date(update),
                        resource_id: ObjectId(updateFromResource[0]._id),
                        update_content: `${worknoteContent}`,
                        comment_content: `${commentContent}`
                    });

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