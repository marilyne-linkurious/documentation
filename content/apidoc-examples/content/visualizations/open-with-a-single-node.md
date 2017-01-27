In this examples, you will learn how to generate a link to open visualizations within the Linkurious user interface.

Let's start with a simple visualization containing only one node of which we know the ID.
To do so, we are going to use the `GET /workspace/new` endpoint.
This endpoint, though, is not an **API**; indeed, we have to be authenticated via HTTP cookie to actually see the visualization.

{{editfile:openwithasinglenode.js}}
