const launchPuppeteer = require('../launchPuppeteer');
const logger = require('../../logger/loggerSettings')();

/**
 * Gets the ticket number DOM details that is feed to it
 * @param {String} ticketNumber 
 */
function getTicketNumberDetail(ticketNumber){

    return new Promise(async (resolve, reject)=>{
        
        try {

            const browser = await launchPuppeteer();

            const page = await browser.newPage();

            await page.goto(`https://pgglobalenterprise.service-now.com/task_list.do?sysparm_view=&sysparm_first_row=1&sysparm_query=active%3Dtrue%5EGOTO${ ticketNumber }%3DINC2154082&sysparm_clear_stack=true`);

            resolve(page.content());

            await page.close();
            
        } catch (error) {
            
            logger.error(error, 'Issue getting the dom of the ticket number');

        }

    })

}

module.exports = getTicketNumberDetail;