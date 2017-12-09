
/* loging init */
var sub;

document.getElementById('btn-login').addEventListener('click', function() {
  document.getElementById("loadingwrapper").style.display = "none";
  var webAuth = new auth0.WebAuth({
    domain: 'unreportable.eu.auth0.com',
    clientID: '8gI6SKuWm85UFNN48z5TIrd8rWqxRt5l',
    responseType: 'token id_token',
    audience: 'https://unreportable.github.io/',
    scope: 'openid profile',
    redirectUri: 'https://unreportable.github.io/',
    leeway: 60
  });

  var profileContainer = document.getElementById('profileContainer');

  var loginlink = document.getElementsByClassName('login-link');
  var logoutlink = document.getElementsByClassName('logout-link');
  var yplink = document.getElementsByClassName('your-profile');
  var profileview = document.getElementById('profile_container');
  var notloggedin = document.getElementById('not-logged-in-cont');
  var userProfile;

    loginlink[0].addEventListener('click', function(e) {
      e.preventDefault();
      webAuth.authorize();
    });

    loginlink[1].addEventListener('click', function(e) {
      e.preventDefault();
      webAuth.authorize();
    });

    logoutlink[0].addEventListener('click',logout);
    logoutlink[1].addEventListener('click',logout);


  /*homeViewBtn.addEventListener('click', function() {
    homeView.style.display = 'inline-block';
    loginView.style.display = 'none';
  });*/

  //logoutBtn.addEventListener('click', logout);

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    document.getElementById('l-m-wrapper').style.display = "block";
    //window.location.href="http://juliabphotography.surge.sh";
    displayButtons();
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        getProfile();
      } else if (err) {
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  try {
    $("#o-f-submit-button").on("click", function() {
      if (isAuthenticated()) {
        var name = $('#inputName').val()
        var num = $('#inputNum').val()
        var contact = $('#inputContact').val()
        var text = $('#inputText').val()
        var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');

        var reqstring = 'NEW ORDER by '  + name + '; <b> number: </b>'
        + num + ';<b> contact: </b>' + contact
        + ';<b> description: </b>'  + text + ' ('+date+')';

        if(name == "" || num == "" || contact == ""|| text == "")
        {
            $('#message').style.display = "block";
        }
        else {
          $.ajax({
              url: '//formspree.io/pienilinnunrata@gmail.com',
              method: "POST",
              data:
              {
                'name': name,
                'number': num,
                'contact': contact,
                'text': text,
                'date': date
              },
              dataType: "json"
          });
          $.ajax({
              url: "https://api.telegram.org/bot497883970:AAHqEVvqCilG5CuGc2SN9sixEON33qsSvSM/sendMessage",
              method: "POST",
              data:
              {
                'chat_id': '358975519',
                'parse_mode': 'HTML',
                'text': reqstring
              },
              dataType: "json"
          });
          alert('Thanks for the order, we\'ll be in touch promptly.');
          $('#inputNum').val("")
          $('#inputContact').val("")
          $('#inputName').val($('#name-cont').html());
          if ($('#occ-cont').html() != "")
            {$('#inputText').val("I find joy in (being) " + $('#occ-cont').html()) }
          else $('#inputText').val("");
          window.location.hash = '';
          return false;
        }
      }
      else alert('You are not logged in!');
    });
  }
  catch (err) {}

  function displayButtons() {
    if (isAuthenticated()) {
      loginlink[0].style.display = 'none';
      loginlink[1].style.display = 'none';
      logoutlink[0].style.display = 'inline-block';
      logoutlink[1].style.display = 'inline-block';
      yplink[0].style.display = 'inline-block';
      yplink[1].style.display = 'inline-block';
      try {
        profileview.style.display = 'block';
        notloggedin.style.display = 'none';
      }
      catch(err) {}
      getProfile();
      //loginStatus.innerHTML = 'You are logged in!';
    } else {
      loginlink[0].style.display = 'inline-block';
      loginlink[1].style.display = 'inline-block';
      logoutlink[0].style.display = 'none';
      logoutlink[1].style.display = 'none';
      yplink[0].style.display = 'none';
      yplink[1].style.display = 'none';
      try {
        profileview.style.display = 'none';
        notloggedin.style.display = 'block';
      }
      catch(err) {}
      //loginStatus.innerHTML =
        //'You are not logged in! Please log in to continue.';
    }
  }

function getProfile() {
  if (!userProfile) {
    console.log("HELLO");
    var accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.log('Access token must exist to fetch profile');
    }

    webAuth.client.userInfo(accessToken, function(err, profile) {
      if (profile) {
        userProfile = profile;
        displayProfile();
      }
    });
  } else {
    console.log("BYE");
    displayProfile();
  }
}

function displayProfile() {
  // display the profile
  //console.log(userProfile);
  /*document.querySelector('#profile-username').innerHTML =
    userProfile.nickname;*/
  //document.querySelector('#id-cont').innerHTML = userProfile.name;
  try {
    document.querySelector('#profile-pic').src = userProfile.picture;
  }
  catch(err) {}
  sub = userProfile.sub;

  var DBref = firebase.database().ref().child("users").child(sub);

  DBref.on("value", snap => {
    var name = snap.child("name").val();
    var occupation = snap.child("occupation").val();
    //console.log(snap.val(),name, occupation,sub);
    $("#name-cont").empty();
    $("#occ-cont").empty();
    $("#name-cont").append(name);
    $("#occ-cont").append(occupation);
    $('#inputName').val(name);
    if (occupation != "")
      {$('#inputText').val("I find joy in (being) " + occupation) }
  });
}


handleAuthentication();
});