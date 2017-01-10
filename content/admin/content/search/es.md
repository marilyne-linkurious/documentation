
ElasticSearch is supported from 1.4+ (for `elasticSearch` connector) and from version 2.0 (for `elasticSearch2` connector).

## Embedded {{es}}

Linkurious ships with an embedded {{es}} server (**version {{es.version}}**).

To use Linkurious' embedded {{es}} instance, simply set the following `index` configurations keys:
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
- `user`: {{es}} username (if you are using [X-Pack Security, a.k.a ElasticShield](https://www.elastic.co/products/x-pack/security)
- `password`: {{es}} password
- `forceReindex`: `true` to re-index the data-source each time Linkurious starts
- `skipEdgeIndexation`: `true` to skip edges indexation (they will not be searchable)
- `analyzer` (default: `"standard"`): The custom analyzer aimed at analyzing a specific language text. (see [available language analysers](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html)).
- `dynamicMapping`: `true` to enable *number parsing* for advanced number search features (range, etc.)
- `dateDetection`: `true` to enable *date parsing* for advanced date search features (range, etc.)
<!-- `webAdmin`: {type: 'string'}, // tolerated but not actually used -->
<!-- `mapping`: {type: 'object'}, // tolerated but is it used? -->

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
- `user`: {{es}} username (if you are using [X-Pack Security, a.k.a ElasticShield](https://www.elastic.co/products/x-pack/security)
- `password`: {{es}} password
- `forceReindex`: `true` to re-index the data-source each time Linkurious starts
- `skipEdgeIndexation`: `true` to skip edges indexation (they will not be searchable)
- `analyzer` (default: `"standard"`): The custom analyzer aimed at analyzing a specific language text. (see [available language analysers](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html)).
- `dynamicMapping`: `true` to enable *number parsing* for advanced number search features (range, etc.)
- `forceStringMapping`: TODO
- `caCert`: Absolute path to *[Certificate Authority]:CA certificate

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
