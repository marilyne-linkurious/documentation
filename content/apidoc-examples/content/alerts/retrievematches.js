request.get({
  uri: '{{baseurl}}/api/{{datasource.readonly}}/alerts/{{example.alertid}}/matches',
  auth: {
    user: '{{simpleuser.email}}',
    pass: '{{apikey}}'
  },
}, function(err, res) {
  console.log(res.body);
});
