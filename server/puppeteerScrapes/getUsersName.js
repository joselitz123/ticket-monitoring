const launchPuppeteer = require('./launchPuppeteer');



module.exports = function(){
    return new Promise(async (resolve, reject)=>{
        try {
            const browser = await launchPuppeteer();
            const page = await browser.newPage();
            await page.goto('https://pgglobalenterprise.service-now.com/nav_to.do');
            await page.waitForNavigation();
            await page.waitForNavigation();
            const users_name = await page.$eval('span.user-name', (el)=>el.innerHTML);
            await page.close();
            resolve(users_name);
        } catch (error) {
            reject(error);
        }
    })
}