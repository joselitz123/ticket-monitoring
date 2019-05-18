const express = require('express');
const router = express.Router();

const perAppTicketComponent = require('./components/appTicketComponents/PerAppTicketComponent');
const ticketDetailComponent = require('./components/ticketDetailsComponent/ticketDetailsComponent');
const ticketUpdateLogs = require('./components/ticketUpdateLogs/ticketUpdateLogs');
const authLoginComponent = require('./components/authLogin/authLogin');
const acknowledgeNotificationComponent = require('./components/acknowledgeNotificationComponent/acknowledgeNotificationComponent');

router.get('/auth/login', async function (req, res) {authLoginComponent(req, res)});

router.get('/applications/:app_id/tickets', function(req, res){ perAppTicketComponent(req, res) });

router.get('/tickets/:ticket_id/details', function (req, res) { ticketDetailComponent(req, res) });

router.get('/tickets/:ticket_id/update_logs', function (req, res) { ticketUpdateLogs(req, res) });

router.post('/notifications/:notif_id/acknowledge', function (req, res) { acknowledgeNotificationComponent(req, res) });


module.exports = router;
