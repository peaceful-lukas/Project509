var express = require('express');

module.exports = function(app, config) {
  app.use(express.favicon());
  app.use(express.static(config.root + '/public'));

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  app.use(express.cookieParser());

  app.use(express.bodyParser({uploadDir: config.root + '/public/tmp/'}));
  app.use(express.methodOverride());

  app.use(express.session({
    secret: 'sns-lukas'
  }));

  app.use(app.router);

  if( 'development' == app.get('env') ) {
    app.use(express.errorHandler());
  }
}