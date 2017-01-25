request.get({
  uri: '{{baseurl}}/api/{{datasource.readonly}}/graph/schema/nodeTypes/properties',
  headers: {
    Authorization: 'Basic student@linkurio.us:{{apikey}}'
  }
}, function(err, res) {
  console.log(res.body);
});
