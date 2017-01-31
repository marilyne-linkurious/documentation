Let's see how to use an API key to access a given resource with an example. We will try to access
the `GET /graph/schema/nodeTypes/properties` API. To do so, we require an API key that has the `schema` 
access-right.

For convenience we will use the API key `{{apikey}}` that already has any possible access-right and can act on behalf of users
in the default group ({{simpleuser.email}} belongs to this group).

To authenticate via API key, you need to use HTTP [basic access authentication](https://www.ietf.org/rfc/rfc2617.txt).
So, for example, if your application wants to act on behalf of the user `{{simpleuser.email}}` and it uses the API key `{{apikey}}`:
- Add the `Authentication` HTTP header field to each HTTP request you want to be authenticated
- As a value of the `Authentication` field, you need to provide a string composed by:
  - `Basic <encodeBase64('<e-mail>:<API_key>')>`

{{editfile:usetheapikey.js}}

In alternative, many libraries, like **request**, offers facilities to use HTTP basic access authentication:

{{editfile:usetheapikeysimpler.js}}
