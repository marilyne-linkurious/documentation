In this examples, you will learn how to generate a link to open visualizations within the Linkurious user interface.

Let's start with a simple visualization containing only one node of which we know the ID.
To do so, we are going to use the `GET /workspace/new` endpoint.
This endpoint is not an **API**; indeed, we have to be authenticated via HTTP cookie to actually see the visualization.

To learn more about the `GET /workspace/new` endpoint, we refer you to read the `GET /api/:dataSource/sandbox` API documentation.
The parameters in input to both endpoints are the same. The first endpoint is a link to the Linkurious user interface,
the second one is the actual API called behind the scenes.

{{editfile:openwithasinglenode.js}}
