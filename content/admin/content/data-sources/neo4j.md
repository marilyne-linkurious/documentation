## Configuration file

To edit the Neo4j data-source configuration, you can either [use the Web user-interface](/configure-sources/#using-the-web-user-interface)
or edit the configuration file located at `linkurious/data/config/{{config.file}}`.

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
- `user` (optional): Neo4j user (if credentials are enabled, see [Neo4j credentials](#neo4j-credentials))
- `password` (optional): Neo4j password (if credentials are enabled)
- `proxy` (optional): URL of the proxy to use to connect to Neo4j
- `allowSelfSigned` (optional): `true` to allow the Neo4j server to use a self-signed SSL certificate
- `alternativeNodeId` (optional): Name of the node property to use as reference in visualizations (see [alternative IDs](/alternative-ids))
- `alternativeEdgeId` (optional): Name of the edge property to use as reference in visualizations
- `latitudeProperty` (optional): Name of the node property to use for latitude (used in geo mode)
- `longitudeProperty` (optional): Name of the node property to use for longitude (used in geo mode)
<!-- `webAdmin` (URL): -->
<!-- `writeURL` (URL): {check: 'httpUrl'},-->

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
```shell
dbms.security.auth_enabled=false
```
