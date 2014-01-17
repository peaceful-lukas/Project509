var sqlite3 = require('sqlite3').verbose();
var fs     = require('fs');

var file = 'db/userProfile.db';
var db = new sqlite3.Database(file);

var logger   = require('../../libs/Logger');

module.exports = {
  
  init: function() {
    db.run('CREATE TABLE IF NOT EXISTS userProfile ('
      + ' userSeq INTEGER PRIMARY KEY AUTOINCREMENT,'
      + ' userId TEXT REFERENCES userAccount(userId),'
      + ' name TEXT,'
      + ' gender TEXT,'
      + ' birth DATE,'
      + ' elderGroup TEXT,'
      + ' leader TEXT,'
      + ' ageGroup INTEGER,'
      + ' duty TEXT,'
      + ' status TEXT,'
      + ' thumbnail TEXT )');
  },
  
  list: function(callback) {
    var stmt = db.prepare('SELECT * FROM userProfile');
    stmt.all(function(err, rows) {
      if(err) throw new Error(err.message);
      else {
        var userProfileList = rows || [];
        callback( userProfileList );
      }
    });
  },
  
  getByUserSeq: function(userSeq, callback) {
    var stmt = db.prepare('SELECT * FROM userProfile WHERE userSeq = ?');
    stmt.get(userSeq, function(err, row) {
      if(err) throw new Error(err.message);
      else {
        var userProfile = row || {};
        callback( userProfile );
      }
    });
  },
  
  getByUserId: function(userId, callback) {
    var stmt = db.prepare('SELECT * FROM userProfile WHERE userId = ?');
    stmt.get(userId, function(err, row) {
      if(err) throw new Error(err.message);
      else {
        var userProfile = row || {};
        callback( userProfile );
      }
    });
  },
  
  save: function(userProfile, callback) {
    userProfile = fill( userProfile );
    
    db.serialize(function() {
      var stmt = db.prepare('INSERT INTO userProfile (userId, name, gender, birth, elderGroup, leader, ageGroup, duty, status, thumbnail) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
      stmt.run(userProfile.userId, userProfile.name, userProfile.gender, userProfile.birth, userProfile.elderGroup, userProfile.leader, userProfile.ageGroup, userProfile.duty, userProfile.status, userProfile.thumbnail);
      stmt.finalize();
      
      callback();
      
      // db.get('SELECT last_insert_rowid()', function(err, row) {
      //   if(err) throw new Error(err.message);
      //   else {
      //     var userSeq = row['last_insert_rowid()'];
      //     callback(userSeq);
      //   }
      // })
    });
  },
}



var defaultValue = {
  name: '-',
  gender: 'female',
  birth: new Date('1995-03-01'),
  elderGroup: '-',
  leader: '-',
  ageGroup: 95,
  duty: '-',
  status: '-',
  thumbnail: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/t1/c0.0.180.180/s160x160/1499386_597554140316580_783093556_a.jpg'
}

function fill(userProfile) {
  // fill entirely.
  userProfile.name = userProfile.name || defaultValue.name;
  userProfile.gender = userProfile.gender || defaultValue.gender;
  userProfile.birth = userProfile.birth || defaultValue.birth;
  userProfile.elderGroup = userProfile.elderGroup || defaultValue.elderGroup;
  userProfile.leader = userProfile.leader || defaultValue.leader;
  userProfile.ageGroup = userProfile.ageGroup || defaultValue.ageGroup;
  userProfile.duty = userProfile.duty || defaultValue.duty;
  userProfile.status = userProfile.status || defaultValue.status;
  userProfile.thumbnail = userProfile.thumbnail || defaultValue.thumbnail;
  
  return userProfile;
}