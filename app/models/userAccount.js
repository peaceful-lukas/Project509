var sqlite3 = require('sqlite3').verbose();
var fs     = require('fs');

var file = 'db/userAccount.db';
var db = new sqlite3.Database(file);

var logger   = require('../../libs/Logger');

module.exports = {
  
  init: function() {
    db.run('CREATE TABLE IF NOT EXISTS userAccount ( userId TEXT PRIMARY KEY, password TEXT )');
  },
  
  get: function(userId, callback) {
    var stmt = db.prepare('SELECT * FROM userAccount WHERE userId = ?');
    stmt.get(userId, function(err, row) {
      if(err) throw new Error(err.message);
      else {
        var userAccount = row || {};
        callback( userAccount );
      }
    });
  },
  
  save: function(userAccount, callback) {
    var stmt = db.prepare('INSERT INTO userAccount ( userId, password ) VALUES (?, ?)');
    stmt.run(userAccount.email, userAccount.password);
    stmt.finalize();
    
    callback();
  },
  
  // modify: function(video, callback) {
  //   db.serialize(function() {
  //     var stmt = db.prepare('UPDATE userAccount SET youtubeVideoId = ?, title = ?, url = ?, thumbnail = ? WHERE _id = ?');
  //     stmt.run(video.vid, video.title, video.url, video.thumbnail, video.mid);
  //     stmt.finalize();
      
  //     callback();
  //   });
  // },
  
  // discard: function(id, callback) {
  //   db.serialize(function() {
  //     var stmt = db.prepare('DELETE FROM userAccount WHERE _id = ?');
  //     stmt.run(id);
  //     stmt.finalize();
      
  //     callback();
  //   });
  // }
}