var express = require('express');
var rootPath = require('path').normalize(__dirname + '/..');

module.exports = function(app) {
  app.use(express.favicon());
  app.use(express.static(rootPath + '/public'));

  app.set('views', rootPath + '/app/views');
  app.set('view engine', 'jade');

  app.use(express.cookieParser());

  app.use(express.bodyParser({uploadDir: rootPath + '/public/tmp/'}));
  app.use(express.methodOverride());

  app.use(express.session({
    secret: 'sns-lukas'
  }));

  app.use(app.router);

  if( 'development' == app.get('env') ) {
    app.use(express.errorHandler());
  }
}