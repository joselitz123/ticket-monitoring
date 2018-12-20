

let user_account = {};
/**
 * Assigns in the global variable the current user that is logged in
 * @param {Object} userAccount 
 */
async function assignUser(userAccount){
    
    user_account = await userAccount;

    return null;
    
}

/**
 * Returns the account of the user who's currently logged in
 */
function returnUseraccount(){

    return user_account;

}

module.exports = assignUser;
module.exports.userAccount = returnUseraccount;