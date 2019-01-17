const cheerio = require('cheerio');
const logger = require('../../../logger/loggerSettings')();
const _ = require('lodash')
const personalRecordPuppeteer = require('../../webLookUps/personalRecords/personalRecordPuppeteer');
const getTicketNumberDetailPuppeteer = require('../../webLookUps/getTicketNumberDetailPuppeteer');
const fetchTicketApplication = require('../../../dbQueries/forScrapeQueries/fetchTicketApplications');
const fetchTicketPriorities = require('../../../dbQueries/forScrapeQueries/fetchTicketPriorities');
const getAutoTickets = require('../../../dbQueries/forScrapeQueries/fetchAutoTickets');
const insertScrapedTickets = require('../../../dbQueries/forScrapeQueries/insertScrapedTickets');


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

            tickets = await scrapeTicketData(pages, user);

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

/**
 * Gets the index of the row from the table coming in DOM element extracted
 * @param {array} filters 
 * @param {array} pages 
 */
function getIndexOfRow(filters, pages){

    return new Promise(async (resolve, reject)=>{

        try {
            
            const $ = cheerio.load(pages[0]);
            let filteredIndex = [];

            filters.map((filter)=>{

                $('#task > #task_table > thead > #hdr_task th').each(function(index){

                    /**
                     * Filters the header
                     */
                    const filterScrape = (stringFilter)=>{

                        return $(this).find('span .column_head').text().indexOf(stringFilter);

                    }

                    if (filterScrape(filter) != -1) {

                        filteredIndex.push(index);
                        
                    }

                });  

                
            });

            resolve(filteredIndex);

        } catch (error) {
            
            logger.error(error, 'Unable to get the index of the columns for the ticket');
            reject(error);

        }

    })


}

/**
 * Scrapes the ticket data from the DOM Object provided to it
 * @param {Array} pages 
 * @param {Object} user 
 */
function scrapeTicketData(pages, user){

    return new Promise(async(resolve, reject)=>{

        try {

            const columnnsToExtract = [  
                'Number',
                'Task type',
                'Configuration item',
                'Status',
                'Priority',
                'Assigned To',
                'Assignment Group',
                'Short Description',
                'Created by'
            ];

            const columnKey = [
                'tckt_nmbr',
                'task_type',
                'conf_item',
                'status',
                'ticket_priority_id',
                'ass_to',
                'ass_group',
                'shrt_desc',
                'auto_tckt'
            ]

            const tickets = [];

            const filteredIndex = await getIndexOfRow([...columnnsToExtract], pages);

            const priorities = await fetchTicketPriorities();

            const applications = await fetchTicketApplication();

            const date = new Date(Date.now()).toLocaleDateString();
            
            await pages.map((page)=>{

                const $ = cheerio.load(page);
                
                $('#task_table > .list2_body > tr').each(async function(){

                    const extractedTicket = filteredIndex.reduce((totalColumns, column, index)=>{
                        
                        const extract = $(this).find('td').eq(column).text();
                        
                        switch (columnKey[index]) {

                            case 'ticket_priority_id'://find the id of the matched priority level for the ticket

                                const selectedPriority = priorities.find((priority)=>{
                                    return priority.priority_name == extract;
                                });

                                return {...totalColumns,[columnKey[index]]: selectedPriority._id};
                                 
                            case 'auto_tckt':

                                const isAutoTicket = extract != user.shortname ? true : false;

                                return {...totalColumns,[columnKey[index]]: isAutoTicket};

                            case 'conf_item'://includes to find the id of the matched application for the ticket
                                
                                const application_object = applications.find(application=>{

                                    return application.conf_item == extract;

                                });

                                const application_id = typeof(application_object) != 'undefined' ? application_object._id : 
                                applications.find(application=>application.conf_item == 'Others')._id;

                                return {...totalColumns, [columnKey[index]]: extract, 'app_id': application_id};
                                
                            default:
                                
                                return {...totalColumns,[columnKey[index]]: extract};

                        }

                    },{});
                
                    tickets.push({user_id: user._id, created_at: date,...extractedTicket});


                });
            });

            logger.info('Tickets scraped recently from SNow of the user', tickets);

            resolve(tickets);

        } catch (error) {
            
            logger.error(error, 'DOM object data scraper had an error' );

            reject();

        }

    });

}


module.exports = scrapeOwnedTicketData;
module.exports.scrapeAutoTickets = scrapeAutoTickets;