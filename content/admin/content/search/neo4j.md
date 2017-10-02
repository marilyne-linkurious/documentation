
Neo4j supports search with the `elasticSearch`, `elasticSearch2` and `neo2es` connectors.

See [details on how to configure ElasticSearch with Linkurious](/es-config).

## Neo4j-to-elasticsearch integration

Neo4j-to-elasticsearch is a Neo4j plugin that allows for automatic synchronization
between Neo4j and {{es}}. This means that all changes to Neo4j are automatically
propagated to {{es}}.

### Resources for supported versions of neo4j-to-elasticsearch:

- For Neo4j 3.1.0:
  - Neo4j 3.1.0: [Mac or Linux (tar)]({{neodl.unix}}3.1.0) / [Mac (dmg)]({{neodl.dmg}}3.1.0) / [Windows 64 installer (exe)]({{neodl.win}}3.1.0) / [Windows (zip)]({{neodl.winzip}}3.1.0)  
  - [neo4j-to-elasticsearch-3.1.0.44.7](https://products.graphaware.com/download/neo4j-to-elasticsearch/graphaware-neo4j-to-elasticsearch-3.1.0.44.7.jar)
  - [graphaware-server-community-all-3.1.0.44](https://products.graphaware.com/download/framework-server-community/graphaware-server-community-all-3.1.0.44.jar)

- For Neo4j 3.1.4
  - Neo4j 3.1.4: [Mac or Linux (tar)]({{neodl.unix}}3.1.4) / [Mac (dmg)]({{neodl.dmg}}3.1.4) / [Windows 64 installer (exe)]({{neodl.win}}3.1.4) / [Windows (zip)]({{neodl.winzip}}3.1.4)
  - [neo4j-to-elasticsearch-3.1.4.49.7](https://products.graphaware.com/download/neo4j-to-elasticsearch/graphaware-neo4j-to-elasticsearch-3.1.4.49.7.jar)
  - [graphaware-server-community-all-3.1.4.49](https://products.graphaware.com/download/framework-server-community/graphaware-server-community-all-3.1.4.49.jar)

- For Neo4j 3.2.1
  - Neo4j 3.2.1: [Mac or Linux (tar)]({{neodl.unix}}3.2.1) / [Mac (dmg)]({{neodl.dmg}}3.2.1) / [Windows 64 installer (exe)]({{neodl.win}}3.2.1) / [Windows (zip)]({{neodl.winzip}}3.2.1)
  - [neo4j-to-elasticsearch-3.2.1.51.7](https://products.graphaware.com/download/neo4j-to-elasticsearch/graphaware-neo4j-to-elasticsearch-3.2.1.51.7.jar)
  - [graphaware-server-community-all-3.2.1.51](https://products.graphaware.com/download/framework-server-community/graphaware-server-community-all-3.2.1.51.jar)

- For Neo4j 3.2.5
  - Neo4j 3.2.5: [Mac or Linux (tar)]({{neodl.unix}}3.2.5) / [Mac (dmg)]({{neodl.dmg}}3.2.5) / [Windows 64 installer (exe)]({{neodl.win}}3.2.5) / [Windows (zip)]({{neodl.winzip}}3.2.5)
  - [neo4j-to-elasticsearch-3.2.5.51.7](https://products.graphaware.com/download/neo4j-to-elasticsearch/graphaware-neo4j-to-elasticsearch-3.2.5.51.7.jar)
  - [graphaware-server-community-all-3.2.5.51](https://products.graphaware.com/download/framework-server-community/graphaware-server-community-all-3.2.5.51.jar)


### Install neo4j-to-elasticsearch

Follow these steps to use install this Neo4j plugin:

1. Download the [GraphAware framework JAR](http://products.graphaware.com/?dir=framework-server-community)
   - Choose a version `A.B.C.x` where `A.B.C` matches your Neo4j version and `x` is *44 or later*.
2. Download the [neo4j-to-elasticsearch JAR](http://products.graphaware.com/?dir=neo4j-to-elasticsearch)
   - Choose a version `A.B.C.x.y` where `A.B.C` matches your Neo4j version and `x.y` is *44.8 or later*.
3. Copy `graphaware-server-community-all-A.B.C.x.jar` and `graphaware-neo4j-to-elasticsearch-A.B.C.x.y.jar` to your `neo4j/plugins` directory
4. Edit the Neo4 configuration at `neo4j/conf/neo4j.conf` and add the following lines at the beginning of the file:
   ```sh
   com.graphaware.runtime.enabled=true
   com.graphaware.module.ES.1=com.graphaware.module.es.ElasticSearchModuleBootstrapper
   com.graphaware.module.ES.uri=HOST_OF_YOUR_ELASTICSEARCH_SERVER
   com.graphaware.module.ES.port=PORT_OF_YOUR_ELASTICSEARCH_SERVER
   com.graphaware.module.ES.relationship=(true)
   com.graphaware.module.ES.mapping=AdvancedMapping
   com.graphaware.module.ES.keyProperty=ID()
   com.graphaware.runtime.stats.disabled=true
   com.graphaware.server.stats.disabled=true
   ```
5. Restart Neo4j


### Integrate with Linkurious

Once the `neo4j-to-elasticsearch` plugin is installed, you need to change
the data-source configuration to use the `neo2es` vendor.

Set the `dataSources.index.vendor` key to `neo2es` in the configuration ({{config}}):
```json
{
  "dataSources": [
    {
      "graph": {
        "vendor": "neo4j"
        "url": "http://127.0.0.1:7474"
      },
      "index": {
        "vendor": "neo2es"
      }
    }
  ]
}
```

Restart Linkurious after saving the configuration.
