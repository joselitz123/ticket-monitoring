const launchPuppeteer = require('../../launchPuppeteer');
const logger = require('../../../logger/loggerSettings')();

/**
 * Scrapes data from Service Now
 */
module.exports = function(user){

    return new Promise(async (resolve, reject)=>{
        try {          
            
            let contents = [];

            const browser = await launchPuppeteer();

            const page = await browser.newPage();

            // await page.goto(`https://pgglobalenterprise.service-now.com/task_list.do?sysparm_nostack=true&sysparm_query=active%3Dtrue%5Eassigned_to%3Djavascript:getMyAssignments()%5EORsys_created_by%3D${ user.shortname }%5Esys_class_name%3Dincident%5EORsys_class_name%3Dsc_req_item&sysparm_first_row=1&sysparm_view=&sysparm_clear_stack=true`, {timeout: 0})
            await page.goto(`https://pgglobalenterprise.service-now.com/task_list.do?sysparm_view=&sysparm_first_row=1&sysparm_query=active%3Dtrue%5Eassigned_to%3Djavascript:getMyAssignments()%5EORsys_created_by%3D${ user.shortname }%5Esys_class_name%3Dincident%5EORsys_class_name%3Dsc_req_item%5Eassignment_group!%3Deb5359f2db17d740dcb15688dc961928&sysparm_clear_stack=true`, {timeout: 0})
            .catch(err=>{
                logger.error(err,'Error while navigating to the active tickets of the user in personalRecordPuppeteer.js');
            });
            
            //gets the total number of tickets for the user
            const length = await page.$eval('.text-align-right > span:nth-child(1) > .vcr_controls > .list_row_number_input > span:nth-child(2)', el=> el.innerHTML); 

            const extractCount = await Math.ceil(length/20);

            if (extractCount > 1) {

                await [...Array(extractCount)].reduce( async(acc, curr, index) => {

                    const ac = await acc;

                    if (index == extractCount-1) {
                        
                        contents.push(await page.content());
                        await page.waitFor(1000);
                        await page.close();

                    } else {

                        const currentTblEl = await page.$eval('.text-align-right > span:nth-child(1) > .vcr_controls > .list_row_number_input > span:nth-child(1)', el=> el.innerHTML); 
                        await contents.push(await page.content());
                        await page.click("button[name='vcr_next']");
                        await page.waitForFunction(`document.getElementsByClassName("list_row_number_input")[0].value > ${ currentTblEl }`);

                    }


                }, Promise.resolve());


                console.log({contents: contents});

                // $("button[name='vcr_next']").html()
                
            }else{

                contents.push(await page.content());

                await page.close();

            }
            logger.trace('Got the DOM from SNOW');
            resolve(contents);
            
        } catch (error) {

            logger.error(error, 'An issue occurred on the data scraper function');

            reject(error);
        }
    })

}