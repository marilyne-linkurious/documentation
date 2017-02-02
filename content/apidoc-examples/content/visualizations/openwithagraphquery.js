// we need to be authenticated via HTTP cookie to open a visualization
request.post({
  uri: '{{baseurl}}/api/auth/login',
  body: {
    usernameOrEmail: '{{simpleuser.email}}',
    password: '{{simpleuser.password}}'
  }
}, function(err, res) {
  // open a new visualization with a graph query
  var graphQuery = '{{example.cypherquery}}';
  var graphDialect = 'cypher';
  console.log('Visualization populated by the graph query: "' + graphQuery + '"');
  var url = '{{baseurlnossl}}/workspace/new' +
      '?source={{datasource.readonly}}' +
      '&populate=pattern' +
      '&pattern_query=' + encodeURIComponent(graphQuery) +
      '&pattern_dialect=' + graphDialect;
  console.log('Click here to open it: ' + url);
});
