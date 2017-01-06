Linkurious allow you to search your graph using natural full-text search.

In order to offer the search feature out-of-the-box, Linkurious ships with an embedded
{{es}} server. The option allow for zero-configuration deployment in many cases.

## Indexing your graph data

By default, Linkurious uses {{es}} for search.
This options requires Linkurious to *index* your graph database,
which technically means that Linkurious will feed the whole content of the graph database
to {{es}} to make it searchable.
The time required to *index* the graph database increases with the size of the graph and this
solution has limits in its scalability.

Indexation typically happens at speeds between 2000 and 20000 nodes or edges per second,
depending on the number of properties for nodes and edges, and hardware performances.

## Embedded {{es}}

By default, Linkurious ships with an embedded {{es}} server (**version {{es.version}}**).
This server only listens for local connections on a non-default port (it binds to `127.0.0.1:9201`),
for security reasons and to avoid collisions with existing servers.

## Use your own {{es}}

It is possible to use your own {{es}} cluster for performances reasons.
Linkurious supports {{es}} v1.x as well as v2.x.
See [details about {{es}} configuration options](/es-config).

## Search scalability and alternatives to {{es}}

Using {{es}} is convenient but may not fit cases where
the graph database is big (more a a couple million nodes and edges) and is regularly
modified from outside Linkurious, which required to re-index the whole database.

In order to offer a scalable search feature on big graphs,
Linkurious offers alternatives search solution:

- With Neo4j: [using the neo4j-to-elasticsearch Neo4j plugin](/search-neo4j/#neo4j-to-elasticsearch-integration) to synchronize Neo4j and {{es}} incrementally
- With DataStax Enterprise Graph: [using Linkurious' DSE Search connector](/search-dse/#dse-search-integration) to use DSE's built-in full-text search capability
- With AllegroGraph: [using Linkurious' AllegroGraph Search connector](/search-allegrograph/#allegrograph-search-integration) to use AllegroGraph built-in full-text search capability

## Edit the search configuration

### Using the Web user interface

The `index` configuration can be changed from the administration interface.

Using an administrator account, access the *Admin* > *Data* menu to edit the current data-source configuration:
![admin-data menu](menu-data.png)

Edit the data-source index configuration:
![edit data-source configuration form](index-config.png)

Submit the changes by hitting the *Save configuration* button
![save data-source configuration](edit-source-submit.png)

### Using the configuration file

Edit the configuration file located at {{config}}.

See details for each supported search connector:
- [{{es}}](/es-config)
- [DSE Search](/search-dse/#integrate-with-linkurious)
- [AllegroGraph Search](/search-allegrograph/#integrate-with-linkurious)
- [Neo4j-to-Elasticsearch](/search-neo4j/#integrate-with-linkurious)
