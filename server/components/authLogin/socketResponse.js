

/**
 * Sents data on user_acc web socket.
 * @param {Object} data - Data of the account information of the current logged-in user.
 */
async function socketResponse(data) {

    const { user_acc } = await require('../../socketRoutes');

    user_acc.volatile.emit('user_acc', JSON.stringify(data));

}

module.exports = socketResponse;