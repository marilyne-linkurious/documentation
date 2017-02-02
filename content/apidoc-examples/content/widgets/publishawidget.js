// first, we expand the node {{example.nodeid}} and we found its neighborhood
request.post({
  uri: '{{baseurl}}/api/{{datasource.readonly}}/graph/nodes/expand',
  auth: {
    user: '{{simpleuser.email}}',
    pass: '{{apikey}}'
  },
  body: {
    ids: [{{example.nodeid}}]
  }
}, function(err, expandNodeRes) {
  var edges = []; // collect all the edges from each node
  _.forEach(expandNodeRes.body, function(node) {
    edges = edges.concat(_.map(node.edges, 'id'));
  });
  edges = _.uniq(edges);

  // then, we create a visualization containing all the nodes and edges that the previous request returned
  request.post({
    uri: '{{baseurl}}/api/{{datasource.readonly}}/visualizations',
    body: {
      title: 'my visualization',
      nodes: expandNodeRes.body.map(function(o) {
        return {
          id: o.id,
          nodelink: {} // it can be left empty, the layout algorithm will give a position to the nodes
        };
      }),
      edges: edges.map(function(o) {
        return {
          id: o
        };
      })
    },
    auth: {
      user: '{{simpleuser.email}}',
      pass: '{{apikey}}'
    },
  }, function(err, postVisRes) {
    var visualizationID = postVisRes.body.visualization.id;
    // then, we apply an automatic layout to our visualization (necessary step for creating a widget)
    request.patch({
      uri: '{{baseurl}}/api/{{datasource.readonly}}/visualizations/' + visualizationID,
      body: {
        do_layout: true
      },
      auth: {
        user: '{{simpleuser.email}}',
        pass: '{{apikey}}'
      }
    }, function (err, patchVisRes) {
      // finally, we create a widget from the visualization
      request.post({
        uri: '{{baseurl}}/api/widget',
        body: {
          visualization_id: visualizationID
        },
        auth: {
          user: '{{simpleuser.email}}',
          pass: '{{apikey}}'
        }
      }, function(err, postWidgetRes) {
        console.log('Widget populated by the node {{example.nodeid}} and its neighborhood');
        var widgetUrl = '{{baseurlnossl}}/widget/' + postWidgetRes.body;

        console.log('Click here to open it: ' + widgetUrl);
      });
    });
  });
});
