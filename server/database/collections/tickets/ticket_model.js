const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const ticketSchema = new Schema({
    user_id: 'String',
    tckt_nmbr: 'String',
    shrt_desc: 'String',
    task_type: 'String',
    conf_item: 'String',
    app_id: { type: Schema.Types.ObjectId},
    status_id: { type: Schema.Types.ObjectId},
    ticket_priority_id: { type: Schema.Types.ObjectId, ref: 'Tckt_priorities' },
    ass_to: 'String',
    ass_group: 'String',
    auto_tckt: 'Boolean',
    created_at: {type: 'date'}
});


/**
 * Object Model of user's ticket in database
 */
function userTicketModel(){

    return new Promise(async (resolve, reject)=>{
        try {

            dbInstance();//instantiate first the database connection

            const db = mongoose.connection;

            db.on('error', ()=>{
                reject(console.error.bind(console, 'conection error:'));
            });

            db.once('connected',()=>{
                resolve(mongoose.model('Usr_tckt',ticketSchema));
            });
            
        } catch (error) {
            
            reject(error);

        }
        

    });

}

module.exports = userTicketModel;