const user_model = require('./user_model');


/**
 * 
 * @param {string} fieldname 
 * @param {string} fieldvalue 
 */
module.exports.isExistValue = async function (fieldname, fieldvalue){
    const userModel = await user_model();
    const data = await userModel.findOne({[fieldname]: fieldvalue});    
    return new Promise((resolve, reject) => {
        try {
        response = data != null ? true : false;
        resolve(response);
        } catch (error) {
            console.log(error);
        }
        
        
    })
    
}

