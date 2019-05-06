const express = require('express');
const router = express.Router();
const logger = require('./logger/loggerSettings')();

const loginUser = require('./puppeteerScrapes/accessAuthLaunch');
const setCookieToBrowser = require('./puppeteerScrapes/setCookieToBrowser');
const intervalFunctions = require('./intervalFunctions');
const test = require('./dbQueries/forDataProviderQueries/ticketPriorityCount');
const userAccount = require('./account');
const perAppTicketComponent = require('./components/appTicketComponents/PerAppTicketComponent');
const ticketDetailComponent = require('./components/ticketDetailsComponent/ticketDetailsComponent');
const ticketUpdateLogs = require('./components/ticketUpdateLogs/ticketUpdateLogs');

let access_token;
let user;

router.get('/auth/login', async function(req, res, next){

	try {

		logger.info('Request to login and begin update in frontend', req.headers);
	
		const response = await loginUser();

		// access_token = await response.browserCookies[0];

		user = await response.user;

		await userAccount(response.user);

		logger.info(`Send out the user's data`, response.user);

		res.send(JSON.stringify(response.user));

		// await setCookieToBrowser(access_token); //set the cookie to a new browser instance to be used for scraping data

		await intervalFunctions(user);
		
	} catch (error) {

		logger.error(error, 'An issue occured in authentication route');
		
	}

	

});

router.get('/applications/:app_id/tickets', function(req, res){ perAppTicketComponent(req, res) });

router.get('/tickets/:ticket_id/details', function (req, res) { ticketDetailComponent(req, res) });

router.get('/tickets/:ticket_id/update_logs', function (req, res) { ticketUpdateLogs(req, res) })


module.exports = router;
