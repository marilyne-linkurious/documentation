The following advanced data-source settings applies to all data-sources.

To change them, see [how to configure Linkurious](/configure).
 
## General settings
 
- `connectionRetries` (default: `10`): The maximum number of connection attempts to each data source and to the search engine before stating them as disconnected.

- `pollInterval` (default: `10`): Check if the data sources and search engine are connected at each interval (in second).
 
## Search engine settings
 
- `indexationChunkSize` (default: `5000`): The number of nodes and edges retrieved at each batch during indexing the graph database.

- `searchAddAllThreshold` (default: `500`): The maximum number of search results that the user can add to a Visualization at once.

- `searchThreshold` (default: `3000`): The maximum number of search results that can be returned.

- `minSearchQueryLength` (default: `3`): The number of characters needed to trigger a search query. Set `1` to provide live results from the first character typed by the user.
 
## Graph exploration settings
 
- `maxPathLength` (default: `20`): The maximum shortest path length returned by Linkurious. Finding the shortest paths is a costly operation. Setting a small number will limit the resources used by the data-source for performing this operation, and will return results faster.

- `shortestPathsMaxResults` (default: `10`): The maximum number of shortest paths returned.

- `rawQueryTimeout` (default: `60000`): Milliseconds after which a query to the database will time out.

- `defaultFuzziness` (default: `0.9`): Default value to search fuzziness between 0 and 1. A value of `1` means exact matching of the search query.

- `expandThreshold` (default: `50`): When the user expands a node with too many neighbors, Linkurious will ask to refine the query so that fewer neighbors are returned.

## Additional Certificate Authorities

- `extraCertificateAuthorities`: Path to a *.pem file. When set, the well known "root" CAs (like VeriSign) will be extended with the extra certificates in the file. The file should consist of one or more trusted certificates in PEM format.

## Password obfuscation
- `obfuscation` (default: `false`): Set to true if you want all the passwords in the configuration to be obfuscated at the next restart of Linkurious.
