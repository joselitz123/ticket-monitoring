const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const notifTypeSchema = new Schema({
    notif_type: 'String'
});


/**
 * Object Model of notification types in database
 */
function notifTypeCon(){

    return new Promise(async (resolve, reject)=>{
        try {

            dbInstance();//instantiate first the database connection

            const db = mongoose.connection;

            db.on('error', ()=>{
                reject(console.error.bind(console, 'conection error:'));
            });

            db.once('connected',()=>{
                resolve(mongoose.model('Notif_type',notifTypeSchema));
            });
            
        } catch (error) {
            
            reject(error);

        }
        

    });

}

module.exports = notifTypeCon;