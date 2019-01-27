const cheerio = require('cheerio');
const logger = require('../../../../logger/loggerSettings')();
const fetchTicketPriorities = require('../../../../dbQueries/forScrapeQueries/fetchTicketPriorities');
const fetchTicketApplication = require('../../../../dbQueries/forScrapeQueries/fetchTicketApplications');
const getTicketStatuses = require('../../../../dbQueries/forScrapeQueries/fetchTicketStatuses');
const getIndexOfRow = require('./getIndexOfRow');

/**
 * Scrapes the ticket data from the DOM Object provided to it
 * @param {Array} pages 
 * @param {Object} user 
 */
function scrapeTicketDataConsumer(pages, user){

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
                'status_id',
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

            const ticket_statuses = await getTicketStatuses();

            const date = new Date(Date.now()).toLocaleDateString();
            
            await pages.map((page)=>{

                const $ = cheerio.load(page);
                
                $('#task_table > .list2_body > tr').each(async function(){                   

                    const extractedTicket = filteredIndex.reduce((totalColumns, column, index)=>{

                        try {
                         
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

                                case 'status_id':

                                    const ticket_status_id = ticket_statuses.find(ticket_status => 

                                        (ticket_status.status_name == extract)

                                        );

                                    logger.debug('status_id data', {extract_name: extract, ticket_status: ticket_status_id});

                                    return {...totalColumns, [columnKey[index]]: ticket_status_id._id};
                                    
                                default:
                                    
                                    return {...totalColumns,[columnKey[index]]: extract};

                            }

                        } catch (error) {

                            logger.error(error, "DOM object data scraper had an error");
                            
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

module.exports = scrapeTicketDataConsumer;