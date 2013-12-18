var pages = require('../app/controllers/pages');


/**
 * Expose routes
 */
module.exports = function(app) {
  app.get('/', pages.index);
}