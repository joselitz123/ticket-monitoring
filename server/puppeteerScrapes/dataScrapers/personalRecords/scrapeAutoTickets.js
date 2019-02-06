const logger = require('../../../logger/loggerSettings')();
const getTicketNumberDetailPuppeteer = require('../../webLookUps/getTicketNumberDetailPuppeteer');
const scrapeTicketDataConsumer = require('./scrapeTicketDataConsumer');

/**
 * Scrapes the auto tickets
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

                        return [...accumulator, scrapeTicketDataConsumer([currentValue], user)];

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


module.exports = scrapeAutoTickets