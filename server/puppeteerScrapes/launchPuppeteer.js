const puppeteer = require('puppeteer');

let puppeteerInstance;

module.exports = function () {

    return new Promise(async (resolve)=>{
        if (typeof(puppeteerInstance) != 'object') {
            puppeteerInstance = await puppeteer.launch({args: [`--proxy-server='direct://'`, `--proxy-bypass-list=*`], headless: false});        
            resolve(puppeteerInstance);
        }else{
            resolve(puppeteerInstance);
        }
    });

}