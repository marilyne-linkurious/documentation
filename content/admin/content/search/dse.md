DataStax Enterprise Graph supports search with the `elasticSearch`, `elasticSearch2` and `dseSearch` connectors.
See [details on how to configure ElasticSearch with Linkurious](/es-config).

The `dseSearch` connector is strongly recommended for graphs with more than 100'000 nodes and edges.

## DSE Search integration

DSE Search in DataStax Enterprise's built-in search engine.
You [can learn more about DSE Search from DataStax' documentation](http://docs.datastax.com/en/latest-dse-search/).

### Index with DSE Search

Please refer to [DataStax' documentation on how to create new indices, including search indices](https://docs.datastax.com/en/dse/5.1/dse-dev/datastax_enterprise/graph/using/createIndexes.html).
Follow these steps to use DSE Search and integrate it with Linkurious:

1. Connect via gremlin to DSE Graph
2. For each node label execute this command:
   ```java
   schema.vertexLabel("MY_NODE_LABEL").index("search").search()
     .by("MY_NODE_PROPERTY_1").asText()
     .by("MY_NODE_PROPERTY_2").asText()
     .by("MY_NODE_PROPERTY_3").asText()
     .by("MY_NODE_PROPERTY_N").asText()
     .add();
   ```
   Every property key that you want to index has to appear in this command.
   You can add as many properties as you want.

We recommend to create `asText()` search indices instead of `asString()` ones. Both types of indices
are supported by Linkurious, but the latter doesn't support `OR` search queries. If you don't need
this feature, `asString()` indices will actually compute search queries faster. It's also possible to mix
`asText()` and `asString()` indices to find a balance of features and performances.

### Integrate with Linkurious

Set the `dataSources.index.vendor` key to `dseSearch` in the configuration ({{config}}):
```json
{
  "dataSources": [
    {
      "graph": {
        "vendor": "dse",
        "url": "ws://127.0.0.1:8182/",
        "graphName": "MY_GRAPH"
      },
      "index": {
        "vendor": "dseSearch"
      }
    }
  ]
}
```

Restart Linkurious after saving the configuration.
