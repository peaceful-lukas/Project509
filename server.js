var http = require('http');
var express  = require('express');
var fs     = require('fs');

var logger   = require('./libs/Logger');

// SQLite3 initialize
require('./app/models/userAccount').init();
require('./app/models/userProfile').init();

// express setting
var app = express();
require('./config/express')(app);
require('./config/routes')(app);

var port = process.env.PORT || 3000;
var server = http.createServer(app).listen(port);

process.on('uncaughtException', function(err) {
  console.log('Unexpected exception: ' + err.message);
  console.log(err.stack);
});