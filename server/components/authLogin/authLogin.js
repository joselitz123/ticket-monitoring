const userAccount = require('../../account');
const intervalFunctions = require('../../intervalFunctions');
const loginUser = require('../../puppeteerScrapes/accessAuthLaunch');
const logger = require('../../logger/loggerSettings')();

async function authLoginComponent(req, res) {

    try {

        logger.info('Request to login and begin update in frontend', req.headers);

        const response = await loginUser();

        const user = await response.user;

        await userAccount(response.user);

        logger.info(`Send out the user's data`, response.user);

        res.send(JSON.stringify(response.user));

        await intervalFunctions(user);

    } catch (error) {

        logger.error(error, 'An issue occured in authentication route');

    }

}

module.exports = authLoginComponent;