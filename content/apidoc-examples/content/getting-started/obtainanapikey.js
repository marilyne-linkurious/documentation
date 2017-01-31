// we need to be admin to obtain a new API key
request.post({
  uri: '{{baseurl}}/api/auth/login',
  body: {
    usernameOrEmail: '{{admin.username}}',
    password: '{{admin.password}}'
  }
}, function(err, res) {
  request.post({
    uri: '{{baseurl}}/api/admin/applications',
    body: {
      name: 'demo_app',
      groups: [1], // we can act on behalf of every user belonging to the default group
      rights: ["visualization.read", "visualization.create", "visualization.edit", "visualization.delete", "visualization.list"]
    }
  }, function(err, res) {
    console.log(res.body);
    console.log('');

    request.get({
      uri: '{{baseurl}}/api/auth/logout' // let's logout too
    }, function(err, res) {});
  });
});
