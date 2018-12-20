const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const ticketPrioritySchema = new Schema({
    priority_name: 'String',
    update_interval: 'Number'
});


/**
 * Object Model of user's ticket in database
 */
function ticketPriorityModel(){

    return new Promise(async (resolve, reject)=>{
        try {

            dbInstance();//instantiate first the database connection

            const db = mongoose.connection;

            db.on('error', ()=>{
                reject(console.error.bind(console, 'conection error:'));
            });

            db.once('connected',()=>{
                resolve(mongoose.model('Tckt_priorities',ticketPrioritySchema));
            });
            
        } catch (error) {
            
            reject(error);

        }
        

    });

}

module.exports = ticketPriorityModel;