The preferred way to use the Linkurious APIs is to access them via API key.
First we have to obtain the API key by creating an **application**. To do so, we will use the `POST /api/admin/applications` API.

To use thi API, however, we need to be authenticated as an **admin** by using HTTP cookie authentication.

When we are authenticated, we can create the application. Applications are used to access a subset of the Linkurious APIs on behalf of given groups of users. 
The administrator can decide which access-rights can be delegated to a given application and for which group of users.

In our example we create an application, that has the right to create, read, update and delete visualizations of any user in the group with id `1` (the default group).

To know which access right you need for a given API, we refer you to read the {{linkurious.apidoc}}.

The response will contain an `apiKey` field that you will need to use for API key authentication.

{{editfile:obtainanapikey.js}}
