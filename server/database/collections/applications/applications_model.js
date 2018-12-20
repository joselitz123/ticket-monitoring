const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const applicationSchema = new Schema({
    app_name: 'String',
    conf_item: 'String'
});


/**
 * Object Model of user's ticket in database
 */
function applicationModel(){

    return new Promise(async (resolve, reject)=>{
        try {

            dbInstance();//instantiate first the database connection

            const db = mongoose.connection;

            db.on('error', ()=>{
                reject(console.error.bind(console, 'conection error:'));
            });

            db.once('connected',()=>{
                resolve(mongoose.model('Application',applicationSchema));
            });
            
        } catch (error) {
            
            reject(error);

        }
        

    });

}

module.exports = applicationModel;