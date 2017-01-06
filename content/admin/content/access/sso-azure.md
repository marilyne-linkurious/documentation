Linkurious supports [Microsoft Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-whatis)
an external authentication provider.

To set up Linkurious authentication with Microsoft Azure Active Directory, follow these steps:

1. Create a new app called `Linkurious` in Azure Active Directory on [Azure Portal](https://portal.azure.com)
2. From the Azure Portal, obtain the following parameters:
   - `authorizationURL`, e.g. `https://login.microsoftonline.com/60d78xxx-xxxx-xxxx-xxxx-xxxxxx9ca39b/oauth2/authorize`
   - `tokenURL`, e.g. `https://login.microsoftonline.com/60d78xxx-xxxx-xxxx-xxxx-xxxxxx9ca39b/oauth2/token`
   - `clientID`, e.g. `91d426e2-xxx-xxxx-xxxx-989f89b6b2a2`
   - `clientSecret`, e.g. `gt7BHSnoIffbxxxxxxxxxxxxxxxxxxtyAG5xDotC8I=`
3. Add an `oauth2` section inside the `access` section in Linkurious' configuration ({{config}})

Example `access.oauth2` configuration with Microsoft Azure Active Directory:

```json
"access": {
  // [...]
  "oauth2": {
    "enabled": true,
    "provider": "azure",
    "authorizationURL": "https://login.microsoftonline.com/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/oauth2/authorize",
    "tokenURL": "https://login.microsoftonline.com/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/oauth2/token",
    "clientID": "XXXXXXXX-XXX-XXXX-XXXX-XXXXXXXXXXXX",
    "clientSecret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }
}
```
