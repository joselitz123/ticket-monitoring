const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbInstance = require('../../dbInstance');

const userSchema = new Schema({
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    pg_shortname: 'string',
    snow_id: 'string',
    username: 'string',
    password: 'string',
    created_at: {type: 'date'},
    updated_at: {type: 'date'}
});

module.exports = function() {
    return new Promise((resolve, reject)=>{
        try {
            dbInstance(); //instantiate first the database connection
            db = mongoose.connection; 
            db.on('error', ()=>{reject(console.error.bind(console, 'conection error:'))});
            db.once('connected',()=>{
                resolve(mongoose.model('User',userSchema));
            });
        } catch (error) {
            console.log(error);
        }
        
        
    })
    
}


