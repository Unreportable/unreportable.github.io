window.addEventListener('load', function() {
  var content = document.querySelector('.content');
  var loadingSpinner = document.getElementById('loading');
  content.style.display = 'block';
  loadingSpinner.style.display = 'none';

  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK_URL,
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    responseType: 'token id_token',
    scope: 'openid email',
    leeway: 60
  });


  function validateEmail(email) { 
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }
  $(document).ready(function() {
    $(".modalbox").fancybox();
    $("#contact").submit(function() { return false; });
    $("#send").on("click", function(){
      var emailval  = $("#email").val();
      var namevl  = $("#name").val();
      var phonevl  = $("#phone").val();
      var msgval    = $("#msg").val();
      var msglen    = msgval.length;
      var mailvalid = validateEmail(emailval);
      if(mailvalid == false) {
        $("#email").addClass("error");
      }
      else if(mailvalid == true){
        $("#email").removeClass("error");
      }
  if(mailvalid == false) {
        $("#name").addClass("error");
      }
      else if(mailvalid == true){
        $("#name").removeClass("error");
      }
      if(mailvalid == false) {
        $("#phone").addClass("error");
      }
      else if(mailvalid == true){
        $("#phone").removeClass("error");
      }
      if(msglen < 4) {
        $("#msg").addClass("error");
      }
      else if(msglen >= 4){
        $("#msg").removeClass("error");
      }
      
    /*  if(mailvalid == true && msglen >= 4) {
        // если обе проверки пройдены
        // сначала мы скрываем кнопку отправки
        $("#send").replaceWith("<em>отправка...</em>");
        $.ajax({
          type: 'POST',
          url: 'sendmessage.php',
          data: $("#contact").serialize(),
          success: function(data) {
            if(data == "true") {
              $("#contact").fadeOut("fast", function(){
                $(this).before("<p><strong>Успешно! Ваше сообщение отправлено  :)</strong></p>");
                setTimeout("$.fancybox.close()", 1000);
              });
            }
          }
        });
      }*/
    });
  });

  
  
  
  
  
  var loginStatus = document.querySelector('.container2 h4');
  var loginView = document.getElementById('login-view');
  var homeView = document.getElementById('home-view');

  

var buttSendTELEGRAM = document.getElementById('send');

  var li1 = document.getElementById('123');
  var li2 = document.getElementById('1234');
  var li3 = document.getElementById('1235');
 /* var li4 = document.getElementById('1236');*/
  var li5 = document.getElementById('1237');
  var li6 = document.getElementById('1238');
var buttonbuy=document.getElementById('btn-buy');
var buttonbuy2 = document.getElementById('5');

  // buttons and event listeners
  var homeViewBtn = document.getElementById('btn-home-view');
  var loginBtn = document.getElementById('btn-login');
  var logoutBtn = document.getElementById('btn-logout');

  homeViewBtn.addEventListener('click', function() {
    homeView.style.display = 'inline-block';
    loginView.style.display = 'none';
  });

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

 
  logoutBtn.addEventListener('click', logout);

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
var name = "Mila";
  var num = 1;
  var contact = "lala";
  var text = "text1";
buttSendTELEGRAM.addEventListener('click',function(e){
    
  var nameF = document.getElementById('name');
 var phoneF =document.getElementById('phone');
 var emailF =document.getElementById('email');
 var msgF =document.getElementById('msg');
    var reqstring = 'NEW ORDER by '  + nameF.textContent + '; <b> number: </b>'
        + phoneF.textContent + ';<b> contact: </b>' + emailF.textContent
        + ';<b> description: </b>'  +msgF.textContent /*+ ' ('+date+')'*/;
  $.ajax({
              url: "https://api.telegram.org/bot446334482:AAGE5weNdKgfnhxZm3gRqTRBB-L1pi0_ETA/sendMessage",
              method: "POST",
              data:
              {
                'chat_id': '219190429',
                'parse_mode': 'HTML',
                'text': reqstring
              },
              dataType: "json"
          }); 
   
   
 });
  
  
  
  
  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  
 /* function puc(){
   webAuth.parseHash(function(err, authResult) {
     
     
     
        webAuth.client.userInfo(authResult.accessToken, function(err, profile) { 
if (profile) { 
var userProfile = profile; 
  var email1 = JSON.parse(userProfile);
console.log(email1);
} 
})
     
     
     
     ;}
                     }*/
  var profile;
  var userProfile;
  function dispemail(){
  
  
  var accessToken1 = localStorage.getItem('access_token');
  webAuth.client.userInfo(accessToken1, function(err, profile) { 
if (profile) { 
  
 /* var obj = JSON.parse(profile);
  console.log(obj)*/
  /*console.log("tyta");*/
  
  
userProfile = profile; 
  console.log(userProfile.email);
 /* console.log("vtoroe tyta");*/
} else {

console.log("very bad");

}
});
  }
  
  
  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        loginBtn.style.display = 'none';
        homeView.style.display = 'inline-block';
      } else if (err) {
        homeView.style.display = 'inline-block';
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }

      displayButtons();
    });
  }


  function displayButtons() {
    if (isAuthenticated()) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
      loginStatus.innerHTML = 'You are logged in!';
      li1.style.display = 'block';
      li2.style.display = 'block';
      li3.style.display = 'block';   
      li5.style.display = 'block';
      li6.style.display = 'block';
      buttonbuy.style.display='inline-block';
      buttonbuy2.style.display='block';
      
      dispemail();
    } else {
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      loginStatus.innerHTML =
        'You are not logged in! Please log in to continue.';
        li1.style.display = 'none';
        li2.style.display = 'none';
        li3.style.display = 'none';
        li5.style.display = 'none';
        li6.style.display = 'none';  
      buttonbuy2.style.display='none';
        buttonbuy.style.display='none';
    }
  }
  handleAuthentication();
});
