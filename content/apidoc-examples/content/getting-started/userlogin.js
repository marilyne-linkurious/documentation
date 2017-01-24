request.post({
  uri: '{{baseurl}}/api/auth/login',
  body: {
    usernameOrEmail: 'student@linkurio.us',
    password: 'student0'
  }
}, function(err, res) {
  console.log('POST /api/auth/login response:');
  console.log(res.body);
  console.log('');

  request.get({
    uri: '{{baseurl}}/api/auth/authenticated'
  }, function(err, res) {
    console.log('GET /api/auth/authenticated status code:');
    console.log('Status code: ' + res.statusCode);
  })
});
