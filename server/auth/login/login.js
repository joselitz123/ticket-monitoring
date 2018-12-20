const bcrypt = require('bcrypt-node');
const jwt = require('jsonwebtoken');
const user_model = require('../../database/collections/users/user_model');
const assert = require('assert');
const authLaunchPuppeteer = require('../../puppeteerScrapes/accessAuthLaunch');
const getUsersName = require('../../puppeteerScrapes/getUsersName');

module.exports = function(req, res) {

    return new Promise(async (resolve, reject)=>{
        const request = req.body;
      
        const loggin = await authLaunchPuppeteer(request.username, request.password);

        if (loggin.auth) {

            const model = await user_model();

            model.findOne({username: request.username})
            .then(async (data)=>{
                if (data == null) {
                    
                    await getUsersName()
                    .then(async (users_name)=>{
                        const new_user = new model({
                            name: users_name,
                            username: request.username,
                            created_at: Date.now()
                        });

                        new_user.save()
                        .then((data)=>{
                            const token = jwt.sign({id: data.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
                            res.status(200).send({auth: true});
                        });
                        
                    })
                    .catch(()=>{
                        res.status(404).send({auth: false, msg: 'error occured while fetching account name'})
                    })

                    
                }else{
                    const token = jwt.sign({id: data.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
                    res.status(200).send({auth: true, token: token});
                }
            })
            .catch((err)=>{
                res.status(404).send({auth: false, msg: 'Unable to connect to data server'});
            })

            


        }else{
            res.status(404).send({auth: false, msg: loggin.msg});
        }

    });

        // return new Promise(async (resolve, reject)=>{
            
        //     const model = await user_model();

        //     model.findOne({username: req.body.username})

        //     .then((data)=>{
                
        //         if (data == null) {

        //             console.log('account not found');
        //             resolve(res.status(404).send({auth: false, msg: "Invalid credential"}));
                    
        //         }else{
                    
        //             const passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
                    
        //             if (passwordIsValid) {

        //                 const webToken = jwt.sign({id: data.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
                        
        //                 resolve(res.status(200).send({auth: true, token: webToken}));

        //             }else{

        //                 resolve(res.status(404).send({auth: false, msg: "Invalid credential"}));

        //             }
                    
        //         }
        //     })
        //     .catch((err)=>{
        //         assert.notEqual(err, null);
        //     })
        // });
        
        
   
    
}