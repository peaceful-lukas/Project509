var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var MemberSchema = new Schema({
  name: { type: String, required: true },
  ageGroup: { type: Number, required: true },
  birth: { type: Date, required: true },
  major: { type: String },
  phone: { type: String },
  thumbnail: { type: String, default: 'http://localhost:3000/images/thumbnail-default.png'}
});

/**
 * Validation
 */

MemberSchema.path('name').validate(function(name) {
  return name.length > 0;
}, 'Member - name validation error');

MemberSchema.path('phone').validate(function(phone) {
  return phone.length === 13;
}, 'Member - phone validation error');

/**
* Pre
*/

MemberSchema.pre('remove', function(next) {
  // cascade delete process. 
});


/**
 * Index
 */

MemberSchema.index({ name: 1 });
MemberSchema.index({ ageGroup: 1 });


/**
 * Statics
 */

MemberSchema.statics = {
    
    
}



mongoose.model('Member', MemberSchema);


/** Test Input */
var Member = mongoose.model('Member');
Member.find({}, function(err, members) {
  if(err) {
    throw new Error(err.message);
  }
  else if( members.length === 0 ) {
    var memberA = new Member({
      name: '테스트_김태우',
      ageGroup: 91,
      birth: new Date('1991-06-16'),
      major: 'Software',
      phone: '010-5504-1125'
    });
    memberA.save();
    
    var memberB = new Member({
      name: '테스트_이은아',
      ageGroup: 92,
      birth: new Date('1992-09-18'),
      major: 'Dance',
      phone: '010-8277-2812'
    });
    memberB.save();
  }
})