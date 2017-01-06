Linkurious supports [Google Suite (a.k.a. Google Apps)](https://gsuite.google.com/)
as an external authentication provider (with Single Sign-On).

Since Google Suite implements the **OpenID Connect** standard, 
this can be configured using Linkurious' OpenID Connect provider.

To set up Linkurious authentication with Google Suite, follow these steps:

1. Create the credentials on your [Google Developers console](https://console.developers.google.com).
2. From the portal, obtain the following parameters:
   - `authorizationURL`, e.g. `https://accounts.google.com/o/oauth2/v2/auth`
   - `tokenURL`, e.g. `https://www.googleapis.com/oauth2/v4/token`
   - `clientID`, e.g. `1718xxxxxx-xxxxxxxxxxxxxxxx.apps.googleusercontent.com`
   - `clientSecret`, e.g. `E09dQxxxxxxxxxxxxxxxxSN`

To limit the access to the Google accounts from your Google Suite domain, remember to add 
the `hd` query parameter to the `authorizationURL` with your domain as value.

Example `access.oauth2` configuration with Google Suite:

```js
"access": {
  // [...]
  "oauth2": {
    "enabled": true,
    "provider": "openidconnect",
    "authorizationURL": "https://accounts.google.com/o/oauth2/v2/auth?hd=YOUR_GSUITE_DOMAIN.COM",
    "tokenURL": "https://www.googleapis.com/oauth2/v4/token",
    "clientID": "XXXXXXXXXX-XXXXXXXXXXXXXXXX.apps.googleusercontent.com",
    "clientSecret": "XXXXXXXXXXXXXXXXXXXXXXX"
  }
}
```
