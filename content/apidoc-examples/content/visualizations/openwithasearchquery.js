// we need to be authenticated via HTTP cookie to open a visualization
request.post({
  uri: '{{baseurl}}/api/auth/login',
  body: {
    usernameOrEmail: '{{simpleuser.email}}',
    password: '{{simpleuser.password}}'
  }
}, function(err, res) {
  // open a new visualization with a search query
  var searchQuery = '{{example.searchquery}}';
  var searchFuzziness = 0.7;
  console.log('Visualization populated by the search query: "' + searchQuery + '"');
  var url = '{{baseurlnossl}}/workspace/new' +
      '?source={{datasource.readonly}}' +
      '&populate=searchNodes' +
      '&search_query=' + encodeURIComponent(searchQuery) +
      '&search_fuzziness=' + searchFuzziness;
  console.log('Click here to open it: ' + url);
});
