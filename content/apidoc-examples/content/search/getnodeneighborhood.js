request.post({
  uri: '{{baseurl}}/api/{{datasource.readonly}}/graph/nodes/expand',
  auth: {
    user: '{{simpleuser.email}}',
    pass: '{{apikey}}'
  },
  body: {
    ids: [{{example.nodeid}}]
  }
}, function(err, res) {
  console.log(res.body);
});
