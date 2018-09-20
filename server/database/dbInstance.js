const mongoose = require('mongoose');

const assert = require('assert');


const dbName = 'tckt_mntr';
const dbUsername = 'joselitz';
const dbPassword = 'joselitz123';

module.exports = function() {
    
   mongoose.connect(`mongodb://ds113402.mlab.com:13402/${dbName}`, {
            user: dbUsername,
            pass: dbPassword
            
        });    
}







