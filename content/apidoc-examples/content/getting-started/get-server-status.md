Let's first check if the Linkurious server is online. To do so we will use the `GET /api/status` API.

This API doesn't require any parameter in input and it's going to respond with a **JSON** object.
The response will contain a `status.code` field that, if everything is working correctly, is set to `200`.

{{editfile:getstatus.js}}
