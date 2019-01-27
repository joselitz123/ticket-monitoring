const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const socketRoutes = require(path.resolve(__dirname, '../server/socketRoutes'));
const router = require(path.resolve(__dirname, '../server/routes'));
const bodyParser = require('body-parser');
const helmet = require('helmet');
const graphqlHTTP = require('express-graphql');

require('dotenv').config();

socketRoutes(io);

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',router);


app.use('/static', express.static(path.join(__dirname, '/../public')));

server.listen(3000, ()=>console.log('App is serving at http://localhost:3000'));

