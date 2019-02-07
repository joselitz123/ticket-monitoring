var assert = require('assert');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const access_point = require('../server/puppeteerScrapes/accessPoint');
const test_func = require('../server/puppeteerScrapes/webLookUps/checkWholeTicketDetails/checkWholeTicketDetailsPuppeteer');
const biops_resource_model = require('../server/dbQueries/notificationLogicQueries/fetchBiopsResources');
const priority_model = require('../server/dbQueries/notificationLogicQueries/fetchTicketsPrioritySorted');
const ticket_status_model = require('../server/dbQueries/forScrapeQueries/fetchTicketStatuses');
const ticketUpdateScrapeController = require('../server/puppeteerScrapes/scrapeControllers/ticketUpdateScrapeController');

describe('Array', function() {

    it('should have data', async ()=>{

        await access_point();

        // const dom_content = await test_func('INC2536834');

        // const prerequisiteData = [biops_resource_model(), priority_model(), ticket_status_model()];

        // const [biops_resources, ticket_priority, ticket_status] = await Promise.all(prerequisiteData);

        // fs.readFile(path.join(__dirname, './testdata.txt'), async(err, dom_content) => {

        //     const $ = await cheerio.load(dom_content);

        //     const activity_dom = await $('.section-content .activity-detail .activity_header');

        //     const activity_date = [];

        //     activity_dom.each( (i, el) =>{

        //         const user = $(el).find('.user').text();
        //         const update = $(el).find('.activity_date').text();

        //         const updateFromResource = biops_resources.filter(element => element.resource_name == user);

        //         const hasWorknote = $(el).next('.activity_data').find('.activity_field[name="work_notes"]').html() == null ? false : true;

        //         const worknoteContent = $(el).next('.activity_data').find('.activity_field[name="work_notes"]').html();

        //         if (updateFromResource.length != 0 && hasWorknote == true) {
                    
        //             activity_date.push({
        //                 ticket_id: 'INC2536834',
        //                 date_of_update: update,
        //                 resource_id: updateFromResource[0]._id,
        //                 worknote_content: worknoteContent
        //             });

        //             return false;

        //         }

        //     });
        //     console.log(JSON.stringify(activity_date, null, 1));
        // });

        const result = await ticketUpdateScrapeController();

        console.log(JSON.stringify(result, null, 1));
    });
  
});