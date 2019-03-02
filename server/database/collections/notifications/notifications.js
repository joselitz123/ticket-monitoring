const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const notificationSchema = new Schema({
    ticket_id: 'String',
    time_acknowledged: {type: 'Date'},
    notification: 'String',
    notif_id: {type: Schema.Types.ObjectId},
    time_prompted: {type: 'Date'},
    is_user_input: 'Boolean'
});


/**
 * Object Model of notificaiton logs in database
 */
function notificationLogs(){

    return new Promise(async (resolve, reject)=>{
        try {

            dbInstance();//instantiate first the database connection

            const db = mongoose.connection;

            db.on('error', ()=>{
                reject(console.error.bind(console, 'conection error:'));
            });

            db.once('connected',()=>{
                resolve(mongoose.model('Notification',notificationSchema));
            });
            
        } catch (error) {
            
            reject(error);

        }
        

    });

}

module.exports = notificationLogs;