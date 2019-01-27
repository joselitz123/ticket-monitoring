const puppeteer = require('puppeteer');
const path = require('path');

let puppeteerInstance;

/**
 * Returns a puppeteer instance that is a chromium browser
 */
module.exports = function () {
    
    return new Promise(async (resolve)=>{
        console.log(typeof(puppeteerInstance));
        if (typeof(puppeteerInstance) != 'object') {
            puppeteerInstance = await puppeteer.launch({args: [`--proxy-server='direct://'`, `--proxy-bypass-list=*`], headless: false});
            
            resolve(puppeteerInstance);
        }else{
            resolve(puppeteerInstance);
        }
    });

}