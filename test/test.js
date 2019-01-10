var assert = require('assert');

const testFunc = require('../server/puppeteerScrapes/accessPoint');
const scrapeAutoTickets = require('../server/puppeteerScrapes/dataScrapers/personalRecords/scrapeTicketData').scrapeAutoTickets;

describe('Array', function() {

    it('should have data', async ()=>{

        const user_data = {
            _id: '5bd6221d4dade63138a5c0c5'
        }

        const result = await testFunc(user_data);
        
        const autoTickets = [{tckt_nmbr: 'INC2343485'}]

        const user = {
            _id: "5bd6221d4dade63138a5c0c5",
            name: "JoseLito Phala",
            shortname: "phala.jl",
        }

        const data = await scrapeAutoTickets(autoTickets, user);

        console.log(JSON.stringify(data, null, 1));

        assert.notEqual(result.length != 0);

    });
  
});