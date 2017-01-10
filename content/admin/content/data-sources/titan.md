
Titan DB is supported from version 1.0.

## Configuration file

To edit the Titan DB data-source configuration, you can either [use the Web user-interface](/configure-sources/#using-the-web-user-interface)
or edit the configuration file located at {{config}}.

Example Titan DB configuration:
```json
{
  "dataSources": [
    {
      "graphdb": {
        "vendor": "titan",
        "url": "ws://127.0.0.1:8182/",
        "configurationPath": "/usr/local/titan/config/titan-cassandra-es.properties"
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

Supported `graphdb` options for Titan DB:

- `url` (*required*): URL of the Gremlin server (must be a WebSocket URL, i.e. start with `ws://`)
- `configurationPath` (*required*): Path to the Gremlin configuration file *on the Gremlin server*
- `alternativeNodeId`: Name of the node property to use as reference in visualizations (see [alternative IDs](/alternative-ids))
- `alternativeEdgeId`: Name of the edge property to use as reference in visualizations
- `latitudeProperty`: Name of the node property to use for latitude (used in geo mode)
- `longitudeProperty`: Name of the node property to use for longitude (used in geo mode)

## Search with Titan DB

For supported `index` options, see our [documentation about search with Titan DB](/search-titan).
