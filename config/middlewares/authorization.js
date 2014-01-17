var logger = require('../../libs/Logger');

module.exports = {
  
  /*
   * 매 요청마다 인증된 유저인지 확인한다.
   * 인증에 실패할 경우 로그인 화면으로.
   */
  hasAuthorization: function(req, res, next) {
    next();
  //   if( req.session.userId ) {
  //     next();
  //   }
  //   else {
  //     req.method = 'GET';
  //     res.redirect('/index');
  //   }
  }
}