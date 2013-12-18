// var mongoose = require('mongoose');
// var Room = mongoose.model('Room');

var logger   = require('../../libs/Logger');

exports.index = function(req, res) {
  res.render('index.jade');
}
