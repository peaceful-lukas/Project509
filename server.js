var http = require('http');
var express  = require('express');
var fs     = require('fs');
var logger   = require('./libs/Logger');
var env    = process.env.NODE_ENV || 'development';
var config   = require('./config/config')[env];
var mongoose = require('mongoose');


// Bootstrap db connection
mongoose.connect(config.db.host, config.db.option);

// Botstrap models
var MODEL_PATH = __dirname + '/app/models';
fs.readdirSync(MODEL_PATH).forEach(function (file) {
    if( ~file.indexOf('.js') ) require(MODEL_PATH + '/' + file);
});

// Bootstrap express
var app = express();
require('./config/express')(app, config);

// Bootstrap routes
require('./config/routes')(app);

// Start the app by listening on <port>
if( env === 'development' ) {
  var port = process.env.PORT || 3000;
  var server = http.createServer(app).listen(port);
  logger.info('Funichat Express server['+env+'] started on port ' + port);
}
else {
  logger.info('NOT SUPPORT PRODUCTION MODE OR LIKE THINGS EXCEPT DEVELOPMENT MODE.');
}


// expose app
exports = app;



// expose app
// process.on('uncaughtException', function(err) {
//   logger.error('Unexpected exception: ' + err.message);
//   logger.error(err.stack);
// });