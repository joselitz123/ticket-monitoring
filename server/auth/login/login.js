const bcrypt = require('bcrypt-node');
const jwt = require('jsonwebtoken');
const user_model = require('../../database/collections/users/user_model');
const assert = require('assert');


module.exports = function(req, res) {


        return new Promise(async (resolve, reject)=>{
            
            const model = await user_model();

            model.findOne({username: req.body.username})

            .then((data)=>{
                
                if (data == null) {

                    console.log('account not found');
                    resolve(res.status(404).send({auth: false, msg: "Invalid credential"}));
                    
                }else{
                    
                    const passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
                    
                    if (passwordIsValid) {

                        const webToken = jwt.sign({id: data.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
                        
                        resolve(res.status(200).send({auth: true, token: webToken}));

                    }else{

                        resolve(res.status(404).send({auth: false, msg: "Invalid credential"}));

                    }
                    
                }
            })
            .catch((err)=>{
                assert.notEqual(err, null);
            })
        });
        
        
   
    
}