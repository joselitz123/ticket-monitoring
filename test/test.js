var assert = require('assert');

const ticket_status_query = require('../server/dbQueries/forDataProviderQueries/appTickets');

describe('Array', function() {

    it('should have data', async (done)=>{

        // const result = await ticket_status_query('5c0894b10d1d233558a179df');

        // console.log(JSON.stringify(result, null, 1));

        // assert.notEqual(result.length, 0);

        var p1 = new Promise((resolve, reject) => { 
            setTimeout(() => resolve('one'), 1000); 
          }); 
          var p2 = new Promise((resolve, reject) => { 
            setTimeout(() => resolve('two'), 2000); 
          });
          var p3 = new Promise((resolve, reject) => {
            setTimeout(() => resolve('three'), 3000);
          });
          var p4 = new Promise((resolve, reject) => {
            setTimeout(() => resolve('four'), 4000);
          });

          Promise.all([p1, p2, p3, p4])
          .then(values => { 
            console.log(values);
          })
          .catch(error => { 
            console.log(error.message)
          });

          done();

    });
  
});