const launchPuppeteer = require('../../launchPuppeteer');
const logger = require('../../../logger/loggerSettings')();

/**
 * Scrapes data from Service Now
 */
module.exports = function(cookie, user){

    return new Promise(async (resolve, reject)=>{
        try {
            
            let contents = [];

            const browser = await launchPuppeteer();

            const page = await browser.newPage();

            await page.setCookie(cookie);

            await page.goto(`https://pgglobalenterprise.service-now.com/task_list.do?sysparm_nostack=true&sysparm_query=active%3Dtrue%5Eassigned_to%3Djavascript:getMyAssignments()%5EORsys_created_by%3D${ user.shortname }%5Esys_class_name%3Dincident%5EORsys_class_name%3Dsc_req_item&sysparm_first_row=1&sysparm_view=&sysparm_clear_stack=true`, {timeout: 0})
            .catch(err=>{
                logger.error(err,'Error while navigating to the active tickets of the user in personalRecordPuppeteer.js');
            });
            
            //gets the total number of tickets in the page
            const length = await page.$eval('.text-align-right > span:nth-child(1) > .vcr_controls > .list_row_number_input > span:nth-child(2)', el=> el.innerHTML); 

            const extractCount = await Math.ceil(length/20);

            if (extractCount > 1) {

                for (let index = 0; index < extractCount; index++) {

                    contents.push(await page.content());
                    
                }

                await page.close();
                
            }else{

                contents.push(await page.content());

                await page.close();

            }
            logger.trace('Got the DOM from SNOW');
            resolve(contents);
            
        } catch (error) {

            error.logger('An issue occurred on the data scraper function', error);

            reject(error);
        }
    })

}