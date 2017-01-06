## Configuration file

To edit the AllegroGraph data-source configuration, you can either [use the Web user-interface](/configure-sources/#using-the-web-user-interface)
or edit the configuration file located at {{config}}.

Example AllegroGraph configuration:
```json
{
  "dataSources": [
    {
      "graphdb": {
        "vendor": "allegroGraph",
        "url": "http://127.0.0.1:10035/",
        "repository": "MY_REPOSITORY"
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

Supported `graphdb` options for AllegroGraph:

- `url` (*required*): URL of the AllegroGraph server 
- `repository` (*required*): Name of the repository to use
- `create`: `true` to let Linkurious create the repository if it does not exist
- `user`: AllegroGraph user (if credentials are enabled)
- `password`: AllegroGraph password (if credentials are enabled) 
- `namespace` (optional, default `http://linkurio.us`): Namespace to use
- `idPropertyName`: Name of the virtual property containing node URIs
- `categoryPredicate` (optional, default `rdf:type`): Predicate used to extract node categories
- `latitudeProperty`: Name of the node property to use for latitude (used in geo mode)
- `longitudeProperty`: Name of the node property to use for longitude (used in geo mode)
          
## Search with AllegroGraph

For supported `index` options, see our [documentation about search with AllegroGraph](/search-allegrograph).
