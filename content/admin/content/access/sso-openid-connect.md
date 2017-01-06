Linkurious supports any [OpenID Connect](http://openid.net/connect/) compatible provider
as external authentication providers.

## What is OpenID Connect?

OpenID Connect is an identity layer on top of the [OAuth2 protocol](https://oauth.net/2/).
It allows applications (like Linkurious) to verify the identity of End-User based on the authentication
performed by an Authorization Server, as well as to obtain basic profile information
about the End-User in an interoperable manner.

## Configuration

To set up Linkurious authentication with an OpenID Connect provider, you need to
obtain the following parameters fro the provider:

   - `authorizationURL`, e.g. `https://accounts.google.com/o/oauth2/v2/auth`
   - `tokenURL`, e.g. `https://www.googleapis.com/oauth2/v4/token`
   - `clientID`, e.g. `1718xxxxxx-xxxxxxxxxxxxxxxx.apps.googleusercontent.com`
   - `clientSecret`, e.g. `E09dQxxxxxxxxxxxxxxxxSN`

Example `access.oauth2` configuration with an OpenID Connect provider:

```js
"access": {
  // [...]
  "oauth2": {
    "enabled": true,
    "provider": "openidconnect",
    "authorizationURL": "https://accounts.google.com/o/oauth2/v2/auth",
    "tokenURL": "https://www.googleapis.com/oauth2/v4/token",
    "clientID": "XXXXXXXXXX-XXXXXXXXXXXXXXXX.apps.googleusercontent.com",
    "clientSecret": "XXXXXXXXXXXXXXXXXXXXXXX"
  }
}
```
