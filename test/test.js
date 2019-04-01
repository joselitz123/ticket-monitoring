var assert = require('assert');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const moment = require('moment-business-days');

const accessPoint = require('../server/puppeteerScrapes/accessPoint');
const test = require('../server/puppeteerScrapes/webLookUps/personalRecords/personalRecordPuppeteer');
// const notifTypes = require('../server/notificationLogics/notificationTypes');
// const test1 = require('../server/notificationLogics/setupNotificationData');



describe('Array', function() {

    it('should have data', async()=>{

        await accessPoint();

        const user = {
            shortname: phala.jl
        }

        const result = await test(user); 

        console.log(JSON.stringify(result, null, 1));

    });

});