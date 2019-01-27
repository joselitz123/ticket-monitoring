const logger = require('../../../logger/loggerSettings')();
const _ = require('lodash')
const personalRecordPuppeteer = require('../../webLookUps/personalRecords/personalRecordPuppeteer');
const getTicketNumberDetailPuppeteer = require('../../webLookUps/getTicketNumberDetailPuppeteer');
const getAutoTickets = require('../../../dbQueries/forScrapeQueries/fetchAutoTickets');
const insertScrapedTickets = require('../../../dbQueries/forScrapeQueries/insertScrapedTickets');
const scrapeTicketDataConsumer = require('./subcomponent/scrapeTicketDataConsumer');

/**
 * Gets the ticket records from Service Now
 * @param {Object} cookies 
 * @param {Object} user 
 */
function scrapeOwnedTicketData(cookies, user){
    
    return new Promise(async (resolve, reject)=>{

        try {
            let tickets = [];

            const pages = await personalRecordPuppeteer(cookies, user);

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

/**
 * 
 * @param {Array} auto_tickets
 * @param {Object} user 
 */
function scrapeAutoTickets(auto_tickets, user){

    return new Promise(async(resolve, reject)=>{

        try {

            if (auto_tickets != null) {//if there's an autoticket, get its latest data

                logger.info('User got autotickets');

                const scrapeCalls = auto_tickets.reduce((accumulator, currentValue)=>{

                    return [...accumulator, getTicketNumberDetailPuppeteer(currentValue.tckt_nmbr)];

                }, []);

                Promise.all(scrapeCalls)
                .then((values)=>{                

                    const extractCalls = values.reduce((accumulator, currentValue)=>{

                        return [...accumulator, scrapeTicketData([currentValue], user)];

                    },[]);

                    Promise.all(extractCalls)
                    .then((extractedData)=>{

                        logger.debug(extractedData, 'extracted the latest data of the autotickets');

                        resolve(extractedData);

                    })
                    .catch(err=>{

                        logger.error(err ,'An issue occured on scraping the data of the autotickets');

                        resolve([]);
                    })

                })
                .catch(err=>{

                    logger.error(err, 'An issue occured on scraping the data of the autotickets');

                    resolve([]);

                })

            }else{

                resolve([]);

            }
            
        } catch (error) {
            
            logger.error(error, 'Issue Occured in scraping autotickets');

            reject(error);

        }

    })

}


module.exports = scrapeOwnedTicketData