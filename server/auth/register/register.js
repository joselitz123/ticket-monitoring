const bcrypt = require('bcrypt-node');
const jwt = require('jsonwebtoken');
const user_model = require('../../database/collections/users/user_model');


module.exports = function(req) {

    return new Promise(async (resolve, reject)=>{
        try {
            
            const request = JSON.parse(req.body.payload);
            const salt = bcrypt.genSaltSync(8);
            const hashedpassword = bcrypt.hashSync(request.password, salt);
            const model = await user_model();
            const userModel = await new model({
                firstname: request.firstname,
                lastname: request.lastname,
                email: request.email,
                pg_shortname: request.pg_shortname,
                snow_id: request.snow_id,
                username: request.username,
                password: hashedpassword,
                created_at: Date.now(),
            });

            userModel.save()
            .then((data)=>{                
                const webToken = jwt.sign({id: data.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
                resolve(webToken); 
            })
            .catch((err)=>{
                console.log(err);
            })
            
        } catch (error) {
            reject(error);
        }
    })
    
}