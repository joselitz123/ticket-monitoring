const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const forActionTicketSchema = new Schema({
    ticket_id: 'String',
    date_to_update: {type: 'Date'},
    date_last_updated: {type: 'Date'},
    time_acknowledged: {type: 'Date'},
    time_prompted: {type: 'Date'},
    is_acknowledged: 'Boolean',
    is_user_input: 'Boolean'
});


/**
 * Object Model of for action tickets table
 */
function forActionTickets(){

    return new Promise(async (resolve, reject)=>{
        try {

            dbInstance();//instantiate first the database connection

            const db = mongoose.connection;

            db.on('error', ()=>{
                reject(console.error.bind(console, 'conection error:'));
            });

            db.once('connected',()=>{
                resolve(mongoose.model('For_action_ticket',forActionTicketSchema));
            });
            
        } catch (error) {
            
            reject(error);

        }
        

    });

}

module.exports = forActionTickets;