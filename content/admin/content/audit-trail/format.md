The audit trail log files contain JSON lines in [JSONL format](http://jsonlines.org/).

You can easily bind a log management system like [Logstash](https://www.elastic.co/products/logstash) 
to interpret them. 

Each log line contains:

- `mode`: `"READ"`, `"WRITE"` or `"READ WRITE"`.
- `date`: The date of the operation (in ISO 8601 format).
- `user`: The email of the user performing the operation.
- `sourceKey`: The identifier of the data-source the operation was applied to.
- `action`: The operation'a action name one of:
   - `"getNode"`
   - `"getEdge"`
   - `"rawQuery"`
   - `"createNode"`
   - `"createEdge"`
   - `"updateNode"`
   - `"updateEdge"`
   - `"deleteNode"`
   - `"deleteEdge"`
   - `"getNodesByEdgesID"`
   - `"getAdjacentNodes"`
   - `"getAdjacentEdges"`
   - `"getAllShortestPaths"`
   - `"searchFull"`
   - `"searchDirectory"`
- `params`: The parameters of the operation.
- `result`: The result of the operation (if configuration `auditTrail.logResult` is true).

Log content example:
```json
{"mode":"WRITE","date":"2017-01-09T17:34:07.446Z","user":"simpleUser@example.com","sourceKey":"e8890b53","action":"createEdge","params":{"createInfo":{"source":4328,"target":4332,"type":"ACTED_IN","data":{"tata":"toto"}}},"result":{"edge":{"id":5958,"data":{"tata":"toto"},"type":"ACTED_IN","source":4328,"target":4332}}}
{"mode":"READ","date":"2017-01-09T17:34:07.478Z","user":"simpleUser@example.com","sourceKey":"e8890b53","action":"getNode","params":{"id":4330},"result":{"node":{"id":4330,"data":{"tagline":"Welcome to the Real World","title":"The Matrix","released":1999,"nodeNoIndexProp":"foo"},"categories":["Movie","TheMatrix"]}}}
{"mode":"READ","date":"2017-01-09T17:34:07.507Z","user":"simpleUser@example.com","sourceKey":"e8890b53","action":"getEdge","params":{"edgeId":5950},"result":{"edge":{"id":5950,"data":{"edgeNoIndexProp":"bar","roles":["Neo"]},"type":"ACTED_IN","source":4313,"target":4330}}}
{"mode":"READ WRITE","date":"2017-01-09T17:34:12.253Z","user":"user@linkurio.us","sourceKey":"e8890b53","action":"rawQuery","params":{"query":"MATCH (n:Person) RETURN n","dialect":"cypher"},"result":{"nodes":[{"id":4357,"data":{"born":1967,"name":"Andy Wachowski"},"categories":["Person"],"edges":[]},{"id":4359,"data":{"born":1967,"name":"Carrie-Anne Moss"},"categories":["Person"],"edges":[]},{"id":4360,"data":{"born":1954,"name":"James Cameron"},"categories":["Person"],"edges":[]},{"id":4361,"data":{"born":1964,"name":"Keanu Reeves"},"categories":["Person"],"edges":[]},{"id":4362,"data":{"born":1965,"name":"Lana Wachowski"},"categories":["Person"],"edges":[]},{"id":4364,"data":{"born":1901,"name":"Phillip Cameron"},"categories":["Person"],"edges":[]},{"id":4365,"data":{"born":1976,"name":"Sam Worthington"},"categories":["Person"],"edges":[]}]}}
{"mode":"READ WRITE","date":"2017-01-09T17:34:12.289Z","user":"user@linkurio.us","sourceKey":"e8890b53","action":"rawQuery","params":{"query":"MATCH (n1)-[r:DIRECTED]->(n2) RETURN n1, r","dialect":"cypher"},"result":{"nodes":[{"id":4357,"data":{"born":1967,"name":"Andy Wachowski"},"categories":["Person"],"edges":[{"id":6009,"data":{},"type":"DIRECTED","source":4357,"target":4366},{"id":6010,"data":{},"type":"DIRECTED","source":4357,"target":4367},{"id":6011,"data":{},"type":"DIRECTED","source":4357,"target":4368}]},{"id":4358,"data":{"tagline":"Return to Pandora","title":"Avatar","released":1999},"categories":["Avatar","Movie"],"edges":[{"id":6034,"data":{},"type":"DIRECTED","source":4360,"target":4358}]},{"id":4360,"data":{"born":1954,"name":"James Cameron"},"categories":["Person"],"edges":[{"id":6034,"data":{},"type":"DIRECTED","source":4360,"target":4358}]},{"id":4362,"data":{"born":1965,"name":"Lana Wachowski"},"categories":["Person"],"edges":[{"id":6020,"data":{},"type":"DIRECTED","source":4362,"target":4366},{"id":6021,"data":{},"type":"DIRECTED","source":4362,"target":4367},{"id":6022,"data":{},"type":"DIRECTED","source":4362,"target":4368}]},{"id":4366,"data":{"tagline":"Welcome to the Real World","title":"The Matrix","released":1999,"nodeNoIndexProp":"foo"},"categories":["Movie","TheMatrix"],"edges":[{"id":6020,"data":{},"type":"DIRECTED","source":4362,"target":4366},{"id":6009,"data":{},"type":"DIRECTED","source":4357,"target":4366}]},{"id":4367,"data":{"tagline":"Free your mind","title":"The Matrix Reloaded","released":2003},"categories":["Movie","TheMatrixReloaded"],"edges":[{"id":6021,"data":{},"type":"DIRECTED","source":4362,"target":4367},{"id":6010,"data":{},"type":"DIRECTED","source":4357,"target":4367}]},{"id":4368,"data":{"tagline":"Everything that has a beginning has an end","title":"The Matrix Revolutions","released":2003},"categories":["Movie","TheMatrixRevolutions"],"edges":[{"id":6022,"data":{},"type":"DIRECTED","source":4362,"target":4368},{"id":6011,"data":{},"type":"DIRECTED","source":4357,"target":4368}]}]}}
```

Details of a log entry:
```js
{
  "mode": "WRITE",
  "date": "2017-01-09T17:34:07.446Z",
  "user": "simpleUser@example.com",
  "sourceKey": "e8890b53",
  "action": "createEdge",
  "params": {"createInfo":{"source":4328,"target":4332,"type":"ACTED_IN","data":{"tata":"toto"}}},
  "result": {"edge":{"id":5958,"data":{"foo":"bar"},"type":"BAZ","source":4328,"target":4332}}
}
```
