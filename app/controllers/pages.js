var userProfileDAO = require('../models/userProfile.js');

var logger   = require('../../libs/Logger');

module.exports = {
  index: function(req, res) {
    var model = {
      pageInfo: 'index',
      background: '/images/commons/welcome-bg.png'
    };
    
    res.render('pages/index.jade', model);
  },
  
  main: function(req, res) {
    userProfileDAO.list(function(userProfileList) {
      var model = {
        pageInfo: 'main',
        background: '/images/commons/main-bg.png',
        userProfileList: userProfileList
      };
      
      res.render('pages/main.jade', model);
    });
  },
  
  profile: function(req, res) {
    var model = {
      pageInfo: 'main',
      background: '/images/commons/main-bg.png',
      profile: req.profile
    };
    
    res.render('pages/profile.jade', model);
  },
  
  bindUser: function(req, res, next, id) {
    userProfileDAO.getByUserSeq(id, function(profile) {
      req.profile = profile;
      next();
    });
  }
}