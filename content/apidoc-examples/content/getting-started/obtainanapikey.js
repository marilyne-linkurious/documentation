// we need to be admin to obtain a new API key
request.post({
  uri: 'http://crunchbase.linkurio.us/api/auth/login',
  body: {
    usernameOrEmail: 'admin',
    password: 'demo_admin'
  }
}, function(err, res) {

  request.post({
    uri: 'http://crunchbase.linkurio.us/api/admin/applications'
  }, function(err, res) {
    console.log(res.body);
  });
});
