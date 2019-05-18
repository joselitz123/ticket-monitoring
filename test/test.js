var assert = require('assert');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const moment = require('moment-business-days');

const accessPoint = require('../server/puppeteerScrapes/accessPoint');
const test = require('../server/dbQueries/forDataProviderQueries/fetchNotifications');
const axios = require('axios');
// const notifTypes = require('../server/notificationLogics/notificationTypes');
// const test1 = require('../server/notificationLogics/setupNotificationData');



describe('Array', function() {

    it('should have data', async()=>{

        const result = await test(); 

        // assert.notEqual(result, undefined);

        console.log(JSON.stringify(result, null, 2));

    });

});