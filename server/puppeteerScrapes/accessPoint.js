const loginUser = require('./accessAuthLaunch');
const logger = require('../logger/loggerSettings')();
const userAccount = require('../account');
const setCookieToBrowser = require('./setCookieToBrowser');
const intervalFunctions = require('../intervalFunctions');

/**
 * Access point
 */
function accessPoint(){

	return new Promise( async(resolve, reject) => {

		try {

			const response = await loginUser();

			access_token = await response.browserCookies[0];

			user = await response.user;

			await userAccount(response.user);

			logger.info(`Send out the user's data`, response.user);

			resolve();
			
		} catch (error) {

			logger.error(error, 'Issue occured while running access point');

			reject();
			
		}

	})    

}

module.exports = accessPoint;