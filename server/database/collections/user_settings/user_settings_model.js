const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const userSettingSchema = new Schema({
    user_id: 'string',
    update_frequency: 'Number',
    created_at: {type: 'date'},
    updated_at: {type: 'date'}
});


/**
 * Object Model of user settings in database
 */
function userSettingsModel() {
    return new Promise((resolve, reject)=>{
        try {
            dbInstance(); //instantiate first the database connection
            db = mongoose.connection; 
            db.on('error', ()=>{reject(console.error.bind(console, 'conection error:'))});
            db.once('connected',()=>{
                resolve(mongoose.model('User_setting',userSettingSchema));
            });
        } catch (error) {
            console.log(error);
        }
        
        
    })
    
}

module.exports = userSettingsModel;

