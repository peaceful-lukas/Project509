var userAPI = require('../app/api/userAPI');

var pageController = require('../app/controllers/pages');

var auth = require('../config/middlewares/authorization').hasAuthorization;
var middlewares = [ auth ];

/**
 * Expose routes
 */
module.exports = function(app) {
  
  app.get('/index', pageController.index);
  app.get('/', middlewares, pageController.main);
  app.get('/users/:id', middlewares, pageController.profile);
  // app.get('/users/:id/settings', middlewares, pageController.alter);
  
  app.post('/api/user/join', userAPI.join);
  app.post('/api/user/login', userAPI.login);
  
  app.param('id', pageController.bindUser);
}