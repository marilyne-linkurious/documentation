request.get({
  uri: '{{baseurl}}/api/{{datasource.readonly}}/graph/nodes/{{example.nodeid}}',
  auth: {
    user: '{{simpleuser.email}}',
    pass: '{{apikey}}'
  },
}, function(err, res) {
  console.log(res.body);
});
