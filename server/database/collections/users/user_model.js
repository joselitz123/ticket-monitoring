const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');
const logger = require('../../../logger/loggerSettings')();

const userSchema = new Schema({
    name: 'string',
    shortname: 'string',
    created_at: {type: 'date'},
    updated_at: {type: 'date'}
});


/**
 * Object Model of users in database
 */
function userModel() {
    return new Promise((resolve, reject)=>{
        try {
            dbInstance(); //instantiate first the database connection
            db = mongoose.connection; 
            db.on('error', err=>{
                logger.error(err, 'An issue issue occured in userModel');
                reject(err);
            });
            db.once('connected',()=>{                

                const model = mongoose.model('User',userSchema);

                logger.trace('Connected with User Model', model);
                
                resolve(model);

            });
        } catch (error) {

            logger.error(error, 'An issue encountered while running query');

        }
        
        
    })
    
}

module.exports = userModel;

