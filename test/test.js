var assert = require('assert');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const moment = require('moment-business-days');

const accessPoint = require('../server/puppeteerScrapes/accessPoint');
const test = require('../server/dbQueries/notificationLogicQueries/fetchForActionTicketPerUser');
const test1 = require('../server/notificationLogics/setupNotificationData');

describe('Array', function() {

    it('should have data', async()=>{

        const result = await test1();


        console.log(JSON.stringify(result, null, 1));

    });

});