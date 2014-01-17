$(document).ready(function() {
  
  /* join form toggle */
  var joinFormToggle = false;
  var toggleForm = function() {
    if( joinFormToggle )  $('.join-form').css('display', 'none');
    else                  $('.join-form').css('display', 'block');
    joinFormToggle = !joinFormToggle;
  };
  
  $('.join-form-switch > img.join-icon').click( toggleForm );
  
  
  /* login */
  $('a.login-btn').click(function() {
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    var email = $('#login-email').val();
    var password = $('#login-password').val();
    
    if( email === '' ) {
      alert('이메일을 입력해주세요.');
    }
    else if( password === '' ) {
      alert('비밀번호를 입력해주세요.');
    }
    else {
      var requestData = {
        email: email,
        password: password
      };
      
      $.ajax({
        type: 'POST',
        url: '/api/user/login',
        data: requestData,
        success: function(result) {
          window.location = '/';
        },
        error: function(result) {
          alert('로그인 실패');
        }
      });
    }
  });
  
  
  /* join */
  $('a.join-btn').click(function() {
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    var name = $('#join-name').val();
    var email = $('#join-email').val();
    var password = $('#join-password').val();
    var passwordVerify = $('#join-password-verify').val();
    
    if( $.trim( name ) === '' ) {
      alert('이름을 입력해 주세요.');
    }
    else if( !emailRegex.test( email )) {
      alert('이메일 형식이 맞지 않습니다.');
    }
    else if( password === '' ) {
      alert('비밀번호를 입력해주세요.');
    }
    else if( passwordVerify === '' ) {
      alert('비밀번호를 다시한번 올바르게 입력해 주세요.');
    }
    else if( password !== passwordVerify ) {
      alert('비밀번호가 맞지 않습니다. 비밀번호를 올바르게 입력해주세요.');
    }
    else {
      var confirmMessage = '입력하신 정보가 맞습니까?\n\n이름: ' + name + '\n이메일: ' + email;
      if( confirm(confirmMessage) ) {
        
        var requestData = {
          name: name,
          email: email,
          password: password
        };
        
        $.ajax({
          type: 'POST',
          url: '/api/user/join',
          data: requestData,
          success: function(result) {
            if(result.join) {
              alert('회원가입 성공!');
              toggleForm();
            }
            else {
              alert('이미 가입된 메일주소입니다.');
            }
          },
          error: function(result) {
            alert('회원가입 실패. 죄송합니다. 서버오류입니다...;; 왜 오류났지;;; 관리자에게 문의주세요. peaceful.lukas@gmail.com ');
          }
        });
      }
    }
  });

  
  // var joinCount = 0;
  // var joinSample = function() {
  //   var requestData = {
  //     name: '김태우',
  //     email: 'happylukas@naver.com' + joinCount,
  //     password: '11'
  //   };
    
  //   $.ajax({
  //     type: 'POST',
  //     url: '/api/user/join',
  //     data: requestData,
  //     success: function(result) {
  //       joinCount++;
  //       console.log('가입');
        
  //       if(joinCount < 30) {
  //         joinSample();
  //       }
  //     }
  //   });
  // };
  
  // joinSample();
  
});