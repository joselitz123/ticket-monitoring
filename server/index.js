const express = require('express');
const app = express();
const path = require('path');
const router = require(path.join(__dirname,'../server/routes'));
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',router);

app.use('/static', express.static(path.join(__dirname, '/../public')));

app.listen(3000, ()=>console.log('App is serving at http://localhost:3000'));