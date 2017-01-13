
## Visualization controls

On the Workspace, various controls are available on the right-bottom of
the screen:

![](Menu.png)

- The `shortcuts` button: ![](Shortcuts.png), give access to a list of
  shortcuts to explore and interact with the graph.
- The `Locate` button ![](Locate.png) centers the graph on the screen.
- The `Zoom In/Zoom Out` button ![](ZoomIO.png) is to zoom in or zoom
  out on our graph.
- The `Layout` button give us various options to organize our graph.

A click on the layout button will apply the current layout, which is a
fast force-directed layout by default.
Two categories of layouts are available: force-directed,
and hierarchical.
They come with pre-defined flavors:

![](FastLayout.png)

## Force-directed layout

Such layouts position nodes according to their connections: connected
nodes are usually closed to each others, while disconnected nodes are
usually pushed further.

**Best Mode:**
Takes the longest time to compute new node positions but provides better
results than the Fast Mode.

![](FM.png)

**Fast Mode (default):**
Quickly finds new node positions but some overlapping nodes may exist.

**Random Mode:**
Node positions are randomized before computing new node positions.

## Hierarchical layout

Such layouts organize nodes in different layers automatically by
aligning nodes of each layer either vertically or horizontally.
The root nodes are automatically found.

**Top to bottom Mode:**
Will position root nodes at the top of the screen.

![](TtB.png)

**Left to Right Mode:**
Will position root nodes at the left side of the screen.

![](LtR.png)

**Bottom to top Mode:**
Will position root nodes at the bottom of the screen.

**Right to left Mode:**
Will position root nodes at the right side of the screen.
