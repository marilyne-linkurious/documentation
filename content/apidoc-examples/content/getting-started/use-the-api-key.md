Here we learn how to use an API key to access a given resource. In this example we want to access
the `GET /graph/schema/nodeTypes/properties` API. To do so, we require an API key that has the `schema` 
access-right.

For convenience we will use th API key `{{apikey}}` that was created to have any possible access-right and to act on behalf of users
in the default group ({{simpleuser.username}} belongs to this group).

{{editfile:usetheapikey.js}}

{{editfile:usetheapikeysimpler.js}}
