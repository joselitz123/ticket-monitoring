const logger = require('../../logger/loggerSettings')();
const _ = require('lodash')
const personalRecordPuppeteer = require('../webLookUps/personalRecords/personalRecordPuppeteer');
const getAutoTickets = require('../../dbQueries/forScrapeQueries/fetchAutoTickets');
const insertScrapedTickets = require('../../dbQueries/forScrapeQueries/insertScrapedTickets');
const scrapeTicketDataConsumer = require('../dataScrapers/personalRecords/scrapeTicketDataConsumer');
const scrapeAutoTickets = require('../dataScrapers/personalRecords/scrapeAutoTickets');

/**
 * Controller for scraping user's personal tickets
 * @param {Object} user 
 */
function personalTicketScrapeController(user){
    
    return new Promise(async (resolve, reject)=>{

        try {
            let tickets = [];

            const pages = await personalRecordPuppeteer(user);

            tickets = await scrapeTicketDataConsumer(pages, user);

            const auto_tickets = await getAutoTickets(user);

            const autoTickets = await scrapeAutoTickets(auto_tickets, user);

            tickets.push(...autoTickets);

            const nonDuplicatedTickets = await _.uniqBy(tickets, 'tckt_nmbr');

            await insertScrapedTickets(nonDuplicatedTickets);

            resolve();

        } catch (error) {

            logger.error(error, 'An error occurred while trying to Scrape own data');   

            reject();
            
        }
        
    });

}


module.exports = personalTicketScrapeController;