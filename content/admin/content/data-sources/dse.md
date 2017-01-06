## Configuration file

To edit the DSE Graph data-source configuration, you can either [use the Web user-interface](/configure-sources/#using-the-web-user-interface)
or edit the configuration file located at {{config}}.

Example DSE Graph configuration:
```json
{
  "dataSources": [
    {
      "graphdb": {
        "vendor": "dse",
        "url": "ws://127.0.0.1:8182/",
        "graphName": "MY_GRAPH"
      },
      "index": {
        "vendor": "elasticSearch",
        "host": "127.0.0.1",
        "port": 9201
      }
    }
  ]
}
```

Supported `graphdb` options for DSE Graph:

- `url` (*required*): URL of the Gremlin server (must be a WebSocket URL, i.e. start with `ws://`)
- `graphName` (*required*): Name of the graph to use
- `create`: `true` to let Linkurious create the graph if it does not exist
- `alternativeNodeId`: Name of the node property to use as reference in visualizations (see [alternative IDs](/alternative-ids))
- `alternativeEdgeId`: Name of the edge property to use as reference in visualizations
- `latitudeProperty`: Name of the node property to use for latitude (used in geo mode)
- `longitudeProperty`: Name of the node property to use for longitude (used in geo mode)

## Search with DSE Graph

For supported `index` options, see our [documentation about search with DSE Graph](/search-dse).
