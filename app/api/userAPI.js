var userAccountDAO = require('../models/userAccount.js');
var userProfileDAO = require('../models/userProfile.js');


module.exports = {
  login: function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    
    userAccountDAO.get(email, function(userAccount) {
      if(userAccount.userId === email && userAccount.password === password) {
        req.session.userId = email;
        
        res.status(200).json({ login: true });
      }
      else {
        res.status(401).json({ login: false });
      }
    });
  },
  
  join: function(req, res) {
    var userAccount = req.body;
    
    if( userAccount.email !== '' && userAccount.password !== '' ) {
      userAccountDAO.get(userAccount.email, function(existingUser) {
        
        // 이미 가입된 유저.
        if( existingUser.userId ) {
          res.status(200).json({ join: false });
        }
        
        // 가입 성공.
        else {
          userAccountDAO.save(userAccount, function() {
            var userProfile = {};
            userProfile.userId = userAccount.email;
            userProfile.name = req.body.name;
            
            userProfileDAO.save(userProfile, function() {
              res.status(201).json({ join: true });
            });
          });
        }
      });
    }
    
    // 파라미터 누락.
    else {
      res.status(412).json({ join: false });
    }
  }
}