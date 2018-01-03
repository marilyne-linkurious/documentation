Elasticsearch is supported from version 1.4.0 (using the `elasticSearch` connector)
and for version 2.x and version 5.x (using the `elasticSearch2` connector).

> Elasticsearch 6 is not yet supported in Linkurious {{package.version}}.

## Embedded {{es}}

Linkurious ships with an embedded {{es}} server (**version {{es.version}}**).

To use the Linkurious embedded {{es}} instance, set the following `index` configurations keys:
- `vendor` must be `elasticSearch`
- `host` must be `"127.0.0.1"`
- `port` must be `9201`

Example configuration:
```json
{
  "dataSources": [
    {
      "graph": {
        "vendor": "neo4j"
        "url": "http://127.0.0.1:7474"
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

## Configuring {{es}} v1.x

Search connector `elasticSearch` supports the following options:

- `host` (*required*): {{es}} server host 
- `port` (*required*): {{es}} server port (standard is `9200`)
- `https`: `true` to connect to {{es}} via HTTPS 
- `user`: {{es}} username (if you are using [X-Pack Security, a.k.a ElasticShield](https://www.elastic.co/products/x-pack/security))
- `password`: {{es}} password
- `forceReindex`: `true` to re-index the data-source each time Linkurious starts
- `skipEdgeIndexation`: `true` to skip edges indexation (edges won't be searchable)
- `analyzer` (default: `"standard"`): The custom analyzer aimed at analyzing a specific language text. (see [available language analysers](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html))
- `dynamicMapping`: `true` to enable *number parsing* for advanced number search features (range, etc.)
- `dateDetection`: `true` to enable *date parsing* for advanced date search features (range, etc.)

Example configuration:
```json
{
  "dataSources": [
    {
      "graph": {
        "vendor": "neo4j"
        "url": "http://127.0.0.1:7474"
      },
      "index": {
        "vendor": "elasticSearch",
        "host": "192.168.1.80",
        "port": 9200,
        "dynamicMapping": false
      }
    }
  ]
}
```

## Configuring {{es}} v2.x

Search connector `elasticSearch2` supports the following options:

- `host` (*required*): {{es}} server host 
- `port` (*required*): {{es}} server port (standard is `9200`)
- `https`: `true` to connect to {{es}} via HTTPS
- `user`: {{es}} username (if you are using [X-Pack Security, a.k.a ElasticShield](https://www.elastic.co/products/x-pack/security))
- `password`: {{es}} password
- `forceReindex`: `true` to re-index the data-source each time Linkurious starts
- `skipEdgeIndexation`: `true` to skip edges indexation (edges won't be searchable)
- `analyzer` (default: `"standard"`): The custom analyzer aimed at analyzing a specific language text. (see [available language analysers](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html))
- `dynamicMapping`: `true` to enable *number parsing* for advanced number search features (range, etc.)
- `forceStringMapping`: List of fields that are mapped to strings even with dynamicMapping is `true`
- `caCert`: Absolute path to a Certificate Authority certificate

Example configuration:
```json
{
  "dataSources": [
    {
      "graph": {
        "vendor": "neo4j"
        "url": "http://127.0.0.1:7474"
      },
      "index": {
        "vendor": "elasticSearch2",
        "host": "192.168.1.122",
        "port": 9200,
        "skipEdgeIndexation": true
      }
    }
  ]
}
```
