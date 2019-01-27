const mongoose = require('mongoose');
const logger = require('../../../logger/loggerSettings')();
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const ticketStatusSchema = new Schema({
    status_name: 'String',
    divide_time: 'Number'
});


/**
 * Object Model of ticket status in database
 */
function ticketStatusModel(){

    return new Promise(async (resolve, reject)=>{
        try {

            dbInstance();//instantiate first the database connection

            const db = mongoose.connection;

            db.on('error', ()=>{
                reject(console.error.bind(console, 'conection error:'));
            });

            db.once('connected',()=>{
                resolve(mongoose.model('tckt_status',ticketStatusSchema));
            });
            
        } catch (error) {
            
            logger.error(error, "An issue occured while iniating connection with Ticket status schema");

            reject();

        }
        

    });

}

module.exports = ticketStatusModel;