const express = require('express');
const router = express.Router();
const path = require('path');
const assert = require('assert');


const allScrape = require('./puppeteerScrapes/allUsers/jose');
const allScrape2 = require('./puppeteerScrapes/allUsers/jose').allScrape2;
const isExistValue = require('./database/collections/users/read').isExistValue;
const addUser = require('./auth/register/register');
const loginUser = require('./auth/login/login');



router.get('/', function(req, res){
	
	res.send('Connection Established');

});

router.get('/test', async function(req, res){
	res.send(await allScrape());
	
})

router.get('/test2', async function(req, res){
	res.send(await allScrape2());
	
})

router.post('/auth/register', async function(req, res){
	 const webToken = await addUser(req);
	 res.status(200).send({auth: true, token: webToken});
});

router.post('/auth/login', async function(req, res){
	await loginUser(req, res);
});

router.post('/auth/register/usernameisexist', async function(req, res){
	res.send(await isExistValue(req.body.fieldname, req.body.fieldvalue));
});



module.exports = router;