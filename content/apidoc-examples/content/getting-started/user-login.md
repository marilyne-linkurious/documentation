While we have been able to check the server and the data-sources status, to use other APIs we need to be authenticated.
Linkurious supports two forms of authentication:
 - HTTP cookie
 - API key (**recommended**)

Here we describe the first form, that you may want to use for the **Admin** APIs or for opening a visualization. The API endpoint to authenticate via HTTP Cookie is `POST /api/auth/login`.
The HTTP client that we use in the example, **request**, is going to store a cookie from the first request, and pass it along in the second request, `GET /api/auth/authenticated`, that returns an `HTTP 204` only if we are authenticated.

{{editfile:userlogin.js}}
