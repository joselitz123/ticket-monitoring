const launchPuppeteer = require('../launchPuppeteer');
const accessAuthLaunch = require('../accessAuthLaunch');
// const cheerio = require('cheerio');

module.exports = function() {

    return new Promise(async(resolve, reject)=>{
        try {
            const browser = await launchPuppeteer();
            const page = await browser.newPage();
            await page.setViewport({width: 1600, height: 800});
            await page.goto('https://pgglobalenterprise.service-now.com/incident.do?sys_id=0e6960c5db90a708b9d5f3451d961976&sysparm_record_target=task&sysparm_record_row=2&sysparm_record_rows=13&sysparm_record_list=active%3Dtrue%5Eassigned_to%3Djavascript%3AgetMyAssignments%28%29%5EORsys_created_by%3Dphala.jl%5Esys_class_name%3Dincident%5EORsys_class_name%3Dsc_req_item%5EORDERBYsys_updated_on', {waitUntil: 'networkidle0'}).catch(()=>{
                console.log('no responsed received on the second link');
            });
            if (await page.$('#username') == null) {
                resolve(page.content());
            }else{                
                const res = await accessAuthLaunch();
                reject(false);
                if (res == true) {
                    
                }
            }
            
            
        } catch (error) {
            console.log(error);
        }
    });

}

module.exports.allScrape2 = function() { 

    return new Promise(async (resolve, reject) => {
        try {
            const browser = await launchPuppeteer();
            const page = await browser.newPage();
            await page.setViewport({width: 1600, height: 800});
            await page.goto('https://pgglobalenterprise.service-now.com/incident.do?sys_id=0e6960c5db90a708b9d5f3451d961976&sysparm_record_target=task&sysparm_record_row=2&sysparm_record_rows=13&sysparm_record_list=active%3Dtrue%5Eassigned_to%3Djavascript%3AgetMyAssignments%28%29%5EORsys_created_by%3Dphala.jl%5Esys_class_name%3Dincident%5EORsys_class_name%3Dsc_req_item%5EORDERBYsys_updated_on', {waitUntil: 'networkidle0'}).catch(()=>{
                console.log('no responsed received on the second link');
            });
            
            resolve(await page.content());    
        } catch (error) {
            reject(error);
        }
                  
    });

}