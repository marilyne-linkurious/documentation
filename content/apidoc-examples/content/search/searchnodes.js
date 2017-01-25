request.get({
  uri: '{{baseurl}}/api/{{datasource.readonly}}',
  headers: {
    Authorization: 'Basic 1:{{apikey}}'
  }
}, function(err, res) {
  console.log(res.body);
});
