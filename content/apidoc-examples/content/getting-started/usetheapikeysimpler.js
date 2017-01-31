request.get({
  uri: '{{baseurl}}/api/{{datasource.readonly}}/graph/schema/nodeTypes/properties',
  auth: {
    user: '{{simpleuser.email}}',
    pass: '{{apikey}}'
  }
}, function(err, res) {
  console.log(res.body);
});
