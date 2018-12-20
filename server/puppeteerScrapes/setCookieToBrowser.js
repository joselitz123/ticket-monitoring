const launchPuppeteer = require('./launchPuppeteer');

/**
 * Sets the cookie to the new browser instance that would be used for scraping data
 * @param {Object} cookies 
 */
module.exports = function (cookies){

    return new Promise(async (resolve, reject)=>{

        try {

            const browser2 = await launchPuppeteer();

            const page2 = await browser2.newPage();

            await page2.setCookie(cookies);

            await page2.goto('https://pgglobalenterprise.service-now.com/task_list.do?sysparm_nostack=true&sysparm_query=active%3Dtrue%5Eassigned_to%3Djavascript:getMyAssignments()%5EORsys_created_by%3Dphala.jl%5Esys_class_name%3Dincident%5EORsys_class_name%3Dsc_req_item&sysparm_first_row=1&sysparm_view=&sysparm_clear_stack=true');

            await page2.on('framenavigated', async ()=>{

                if (page2.url().indexOf('https://pgglobalenterprise.service-now.com/navpage.do') != -1) {

                    page2.close();

                    resolve();            

                }

            });
            
        } catch (error) {
            
            reject(error)

        }


    });

}
