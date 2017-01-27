request.get({
  uri: '{{baseurl}}/api/{{datasource.readonly}}/search/nodes',
  auth: {
    user: '{{simpleuser.email}}',
    pass: '{{apikey}}'
  },
  qs: {
    q: '{{example.searchquery}}',
    fuzziness: 0.7
  }
}, function(err, res) {
  console.log(res.body);
});
