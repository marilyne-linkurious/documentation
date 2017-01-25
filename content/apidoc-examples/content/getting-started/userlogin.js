request.post({
  uri: '{{baseurl}}/api/auth/login',
  body: {
    usernameOrEmail: '{{simpleuser.username}}',
    password: '{{simpleuser.password}}'
  }
}, function(err, res) {
  console.log('POST /api/auth/login response:');
  console.log(res.body);
  console.log('');

  request.get({
    uri: '{{baseurl}}/api/auth/authenticated'
  }, function(err, res) {
    console.log('GET /api/auth/authenticated status code:');
    console.log(res.statusCode);
    console.log('');

    request.get({
      uri: '{{baseurl}}/api/auth/logout'
    }, function(err, res) {
      console.log('GET /api/auth/logout status code:');
      console.log(res.statusCode);
    });
  });
});
