
DataStax Enterprise Graph is supported from version 5.0.4.

## Prerequisites

In order to use DSE Graph with Linkurious is necessary that the option `graph.tx_autostart` is set to `true`
on your current database.

Enable it via the DSE gremlin console by typing:

```
:remote config alias g <graphName>.g
graph.schema().config().option('graph.tx_autostart').set('true')
```

Depending on the search connector you will use, it may be necessary to set to `true` also the option `graph.allow_scan`.

```
:remote config alias g <graphName>.g
graph.schema().config().option('graph.allow_scan').set('true')
```

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

{{dse.graph.dao.options}}

## Search with DSE Graph

For supported `index` options, see our [documentation about search with DSE Graph](/search-dse).
