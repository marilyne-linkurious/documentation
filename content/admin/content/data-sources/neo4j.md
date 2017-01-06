## Configuration file

To edit the Neo4j data-source configuration, you can either [use the Web user-interface](/configure-sources/#using-the-web-user-interface)
or edit the configuration file located at {{config}}.

Example Neo4j configuration:
```json
{
  "dataSources": [
    {
      "graphdb": {
        "vendor": "neo4j",
        "url": "http://127.0.0.1:7474/",
        "user": "MY_NEO4J_USER",
        "password": "MY_NEO4J_PASSWORD"
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

Supported `graphdb` options with Neo4j:

- `url` (*required*): URL of the Neo4j server
- `user`: Neo4j user (if credentials are enabled, see [Neo4j credentials](#neo4j-credentials))
- `password`: Neo4j password (if credentials are enabled)
- `proxy`: URL of the proxy to use to connect to Neo4j
- `allowSelfSigned`: `true` to allow the Neo4j server to use a self-signed SSL certificate
- `alternativeNodeId`: Name of the node property to use as reference in visualizations (see [alternative IDs](/alternative-ids))
- `alternativeEdgeId`: Name of the edge property to use as reference in visualizations
- `latitudeProperty`: Name of the node property to use for latitude (used in geo mode)
- `longitudeProperty`: Name of the node property to use for longitude (used in geo mode)
<!-- `webAdmin` (URL): not used at all -->
<!-- `writeURL` (URL): not fully functional -->

## Search with Neo4j

For supported `index` options, see our [documentation about search with Neo4j](/search-neo4j).

## Neo4j credentials

Since Neo4j v2.2, you need to create credentials for Neo4j before using it.
If you just installed Neo4j, these steps will help you create credentials:

1. Launch the Neo4j server
2. Open your Web browser at http://127.0.0.1:7474
3. Follow the instructions to create a new username and password

Alternatively, you can disable credentials in Neo4j by editing the Neo4j configuration at `neo4j/conf/neo4j.conf`
and uncommenting the following line:
```sh
dbms.security.auth_enabled=false
```
