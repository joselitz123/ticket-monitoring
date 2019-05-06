const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const tckt_update_logSchema = new Schema({
    ticket_id: 'String',
    date_updated: {type: 'Date'},
    resource_id: {type: Schema.Types.ObjectId},
    update_content: 'String',
    comment_content: 'String'
});


/**
 * Object Model of ticket update logs in database
 */
function tckt_update_log(){

    return new Promise(async (resolve, reject)=>{
        try {

            dbInstance();//instantiate first the database connection

            const db = mongoose.connection;

            db.on('error', ()=>{
                reject(console.error.bind(console, 'conection error:'));
            });

            db.once('connected',()=>{
                resolve(mongoose.model('Tckt_update_log',tckt_update_logSchema));
            });
            
        } catch (error) {
            
            reject(error);

        }
        

    });

}

module.exports = tckt_update_log;