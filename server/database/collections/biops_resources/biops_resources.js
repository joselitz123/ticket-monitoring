const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const biopsResourceSchema = new Schema({
    resource_name: 'String',
});


/**
 * Object Model of biops resources in database
 */
function biops_resources(){

    return new Promise(async (resolve, reject)=>{
        try {

            dbInstance();//instantiate first the database connection

            const db = mongoose.connection;

            db.on('error', ()=>{
                reject(console.error.bind(console, 'conection error:'));
            });

            db.once('connected',()=>{
                resolve(mongoose.model('Biops_resources',biopsResourceSchema));
            });
            
        } catch (error) {
            
            reject(error);

        }
        

    });

}

module.exports = biops_resources;