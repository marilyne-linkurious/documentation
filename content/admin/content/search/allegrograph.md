AllegroGraph supports search with the `elasticSearch`, `elasticSearch2` and `allegroGraphSearch` connectors.

See [details on how to configure ElasticSearch with Linkurious](/es-config).

The `allegroGraphSearch` connector is strongly recommended for graphs with more than 1'000'000 triples.

## AllegroGraph search integration

Linkurious can search for nodes directly on the free-text indices managed by AllegroGraph itself.
To do so, you have to configure the vendor property under index to the value "allegroGraphSearch" 
and configure AllegroGraph accordingly to have a free-text index.

If you already have a free-text index, skip the next step.

### Create a free-text index in AllegroGraph

1. Go to the repository page on AllegroGraph WebView (by default at http://127.0.0.1:10035)
2. Press *Manage free-text indices*
3. Create a new free-text index, the name is irrelevant
4. The default options for the newly created index should be enough.
   You must ensure that `"Objects"` under `Fields to index` is highlighted.

### Integrate with Linkurious

Set the `dataSources.index.vendor` key to `allegroGraphSearch` in the configuration (`linkurious/data/config/{{config.file}}`):
```json
{
  "dataSources": [
    {
      "graph": {
        "vendor": "allegroGraph",
        "url": "http://127.0.0.1:10035/",
        "repository": "MY_REPOSITORY"
      },
      "index": {
        "vendor": "allegroGraphSearch"
      }
    }
  ]
}
```

Restart Linkurious after saving the configuration.
