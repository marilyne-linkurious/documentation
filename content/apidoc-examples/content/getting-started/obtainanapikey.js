// we need to be admin to obtain a new API key
request.post({
  uri: '{{baseurl}}/api/auth/login',
  body: {
    usernameOrEmail: 'admin',
    password: 'demo_admin'
  }
}, function(err, res) {
  request.post({
    uri: '{{baseurl}}/api/admin/applications',
    body: {
      name: 'demo_app',
      groups: [1], // we can act on behalf of every user belonging to the default group
      rights: ["visualization.read", "visualization.create", "visualization.edit", "visualization.delete", "visualization.list", "visualizationFolder.create", "visualizationFolder.edit", "visualizationFolder.delete", "visualizationShare.read", "visualizationShare.create", "visualizationShare.delete", "sandbox", "widget.read", "widget.create", "widget.edit", "widget.delete", "graphItem.read", "graphItem.create", "graphItem.edit", "graphItem.delete", "graphItem.search", "savedGraphQuery.read", "savedGraphQuery.create", "savedGraphQuery.edit", "savedGraphQuery.delete", "graph.rawRead", "graph.rawWrite", "graph.shortestPath", "alert.read", "alert.doAction", "schema"]
    }
  }, function(err, res) {
    console.log(res.body);
  });
});
