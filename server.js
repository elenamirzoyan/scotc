require('dotenv').config({path: __dirname+'/.env'});
var express         = require('express');
var session         = require('express-session');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var i18n            = require("i18n");
var path            = require('path');
var http            = require('http');
var request         = require('request');
var fs              = require('fs');
var jade            = require('jade');
global._            = require('underscore');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'excitem', 'view'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./excitem')('routes', app);

app.listen( process.env.PORT, function() {
    console.log( 'Server listening on port %d in %s mode', process.env.PORT, process.env.PROFILE );
});