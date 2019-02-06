const launchPuppeteer = require('../../launchPuppeteer');
const logger = require('../../../logger/loggerSettings')();

/**
 * Checks the whole detail of a ticket by checking its work notes
 * @param {String} ticket - Ticket that are to be checked
 */
function checkWholeTicketDetails(ticket) {

    return new Promise(async(resolve, reject) => {

        try {
            
            const browser = await launchPuppeteer();

            const page = await browser.newPage();

            if (ticket.indexOf('RITM') != -1) {
                
                await page.goto(`https://pgglobalenterprise.service-now.com/sc_req_item.do?sys_id=${ticket}`);

            }else{

                await page.goto(`https://pgglobalenterprise.service-now.com/incident.do?sys_id=${ticket}`);

            }

            const dom_content = await page.content();

            resolve(dom_content);

            await page.close();

        } catch (error) {
            
            logger.error(error, 'An issue occured in checkWholeTicketDetails');

            reject();

        }

    })

}

module.exports = checkWholeTicketDetails;