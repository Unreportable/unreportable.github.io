var lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_DOMAIN');



document.getElementById('btn-login').addEventListener('click', function() {
    lock.show(function(err, profile, token) {
      if (err) {
        // Error callback
        console.error("Something went wrong: ", err);
      } else {
        // Success calback  
  
        // Save the JWT token.
        localStorage.setItem('userToken', token);
        // Save the profile
        localStorage.setItem('userProfile', JSON.stringify(profile));
      }
    });
  });



  var getFoos = fetch('/api/foo', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    },
    method: 'GET',
    cache: false
  });
  
  getFoos.then(function (response) {
    response.json().then(function (foos) {
      console.log('the foos:', foos);
    });
  });

 // localStorage.removeItem('userToken');
//  localStorage.removeItem('userProfile');
 // window.location.href = "/";