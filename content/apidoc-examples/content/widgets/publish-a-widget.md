Here we will learn how to create a widget starting from a visualization.
We first use the `POST /api/:dataSource/visualizations` API to create a visualization.
Then, we use the `PATCH /api/:dataSource/visualizations` API to apply an automatic layout
to the nodes belonging to the newly created visualization.
Finally, with the `POST /api/widget` API we publish the visualization as a widget.

{{editfile:publishawidget.js}}
