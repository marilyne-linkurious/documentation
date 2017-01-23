request.post({
  uri: 'http://crunchbase.linkurio.us/api/auth/login',
  body: {
    usernameOrEmail: 'student@linkurio.us',
    password: 'student0'
  }
}, function(err, res) {
  console.log('POST /api/auth/login response:');
  console.log(res.body);
  console.log('');

  request.get({
    uri: 'http://crunchbase.linkurio.us/api/auth/authenticated'
  }, function(err, res) {
    console.log('GET /api/auth/authenticated status code:');
    console.log('Status code: ' + res.statusCode);
  })
});
