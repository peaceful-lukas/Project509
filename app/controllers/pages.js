var mongoose = require('mongoose');
var Member = mongoose.model('Member');

var logger   = require('../../libs/Logger');

exports.index = function(req, res) {
  Member.find({}, function(err, members) {
    var data = {
      members: members || []
    };
    
    res.render('pages/index.jade', data);
  });
}
