const userAccount = require('../../account');
const intervalFunctions = require('../../intervalFunctions');
const loginUser = require('../../puppeteerScrapes/accessAuthLaunch');
const logger = require('../../logger/loggerSettings')();
const socketResponse = require('./socketResponse');

async function authLoginComponent(req, res) {

    try {

        logger.info('Request to login and begin update in frontend', req.headers);
        
        res.status(200).send();

        const response = await loginUser();

        const user = await response.user;

        await socketResponse(response.user);

        await userAccount(response.user);

        logger.info(`Send out the user's data`, response.user);

        await intervalFunctions(user);

    } catch (error) {

        logger.error(error, 'An issue occured in authentication route');

    }

}

module.exports = authLoginComponent;