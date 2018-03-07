
Expanding nodes means displaying the nodes that are connected to one
node or to a group of nodes.

We can expand nodes in different ways:

* double-click on a node in the view.
* select one or multiple nodes, then click on the `Expand` button of the
  left panel.
* right-click on a node in the view, then click on the `Expand` button of
  the tooltip.

![](Option.png)

The `Expand` button on the left panel displays the list of available
edge types and neighbor categories.
We can choose to get everything or to filter the retrieved edges
and neighbors.

![](Propositions.png)

If the expanded nodes have too many neighbors, it may however lead to
unreadable visualization.

{{lke}} prevents us from adding too many neighbors at once by asking
to filter the retrieved neighborhood.
A safeguard popup will appear, providing options to select a specific
edge type and neighbor category, to pick the most or least
connected neighbors, and to change the maximal number of retrieved
neighbors.
We may bypass this limit manually.

![](TooMany.png)

###Supernodes

When the number of neighbors of a node is bigger than the `supernodeThreshold`
configured by the administrator (on the following example, `1000`), the
node will show on the badge an approximate value of connections followed by
the plus signal.

![](Supernode.png)

Despite the behavior of a supernode being similar to the one of a regular node, it's not
possible to expand multiple nodes at the same time when at least one of the selected nodes is a supernode.

![](SupernodeWarning.png)

To avoid ending up with an unreadable visualization every time a supernode
is expanded, a safeguard popup will appear, providing options to select a specific
edge type, neighbor category and maximum number of retrieved neighbors.

![](SupernodeExpandModal.png)

> It is tempting to always add more nodes and edges to your
visualization.
Beware though, if you are not careful you may end up with too many nodes
on your screen... and a worthless visualization. <br><br>
In order to avoid that, remember to always think twice before adding
more information to your visualization.
The filters and the hide functionality are here to help!
