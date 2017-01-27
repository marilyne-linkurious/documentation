request.get({
  uri: '{{baseurl}}/api/{{datasource.readonly}}/graph/schema/nodeTypes/properties',
  headers: {
    Authorization: 'Basic ' + btoa('{{simpleuser.email}}:{{apikey}}')
  }
}, function(err, res) {
  console.log(res.body);
});
