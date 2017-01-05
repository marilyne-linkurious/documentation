
The following are advanced data-source settings that apply to all data-sources.
They can be changed in the configuration file (`linkurious/data/config{{config.file}}`) under the `allSources` key.
 
## General settings
 
- `connectionRetries` (default: `10`): The maximum number of connection attempts to each data source and to the search engine before stating them as disconnected.
- `pollInterval` (default: `10`): Check if the data sources and search engine are connected at each interval (in second).
 
## Search engine settings
 
- `indexationChunkSize` (default: `5000`): The number of nodes and edges retrieved at each batch during indexing the graph database.
- `searchAddAllThreshold` (default: `500`): The maximum number of search results that the user can add to a Visualization at once.
- `searchThreshold` (default: `3000`): The maximum number of search results that can be returned.
- `minSearchQueryLength` (default: `3`): The number of characters needed to trigger a search query. Set `1` to provide live results from the first character typed by the user.
<!-- `analyzer` (default: `"standard"`): The custom analyzer aimed at analyzing a specific language text. (see [available language analysers](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html)). -->
 
## Graph exploration settings
 
- `maxPathLength` (default: `20`): The maximum shortest path length returned by Linkurious. Finding the shortest paths is a costly operation. Setting a small number will limit the resources used by the data source for performing this operation, and will return results faster.
- `shortestPathsMaxResults` (default: `10`): The maximum of shortest paths returned.
- `rawQueryTimeout` (default: `60000`): Abandon a query to the database if the time is over (in second).
- `defaultFuzziness` (default: `0.9`): Default value to search fuzziness between 0 and 1. A value of `1` means exact matching of the search query.
- `expandThreshold` (default: `50`): When the user expands a node with too many neighbors, Linkurious will ask to refine the query so that fewer neighbors are returned.
