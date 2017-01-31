We are finally ready to explore the graph. We will use the `POST /api/:dataSource/graph/nodes/expand` API.

We will ask Linkurious to return the adjacent nodes to the node with ID `{{example.nodeid}}` and the edges
within this subset of nodes.

{{editfile:getnodeneighborhood.js}}
