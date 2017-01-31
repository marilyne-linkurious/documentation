// we need to be authenticated via HTTP cookie to open a visualization
request.post({
  uri: '{{baseurl}}/api/auth/login',
  body: {
    usernameOrEmail: '{{simpleuser.email}}',
    password: '{{simpleuser.password}}'
  }
}, function(err, res) {
  // open a new visualization with one node
  var nodeId = {{example.nodeid}};
  console.log('Visualization populated by the node ' + nodeId);
  var urlSingleNode = '{{baseurl}}/workspace/new' +
      '?source={{datasource.readonly}}' +
      '&populate=nodeId' +
      '&item_id=' + nodeId;
  console.log('Click here to open it: ' + urlSingleNode);
  console.log('');

  // open a new visualization with one node and its neighborhood
  console.log('Visualization populated by the node ' + nodeId + ' and its neighborhood');
  var urlNodeAndNeighbors = '{{baseurl}}/workspace/new' +
      '?source={{datasource.readonly}}' +
      '&populate=expandNodeId' +
      '&item_id=' + nodeId;
  console.log('Click here to open it: ' + urlNodeAndNeighbors);
});
