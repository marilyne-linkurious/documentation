Linkurious supports any [SAML2](https://en.wikipedia.org/wiki/SAML_2.0) compatible provider
as external authentication providers.

## Configuration

To set up Linkurious authentication with a SAML2 provider, you need to
obtain the following parameters from the provider:

   - `url`, e.g. `https://example.com/adfs/ls`,
   - `identityProviderCertificate`, e.g. `/Users/example/linkurious/samlIdentityProvider.cert`,
   - `groupAttribute` (optional), e.g. `Groups`
   
`groupAttribute` is the attribute of the SAML response containing the array of groups a user belongs to.

Example `access.saml2` configuration with any SAML2 provider:

```json
"access": {
  // [...]
  "saml2": {
    "enabled": true,
    "url": "https://example.com/adfs/ls",
    "identityProviderCertificate": "/Users/example/linkurious/saml.cert",
    "groupAttribute": "Groups"
  },
}
```

## ADFS Configuration

In particular, **ADFS** (Active Directory Federation Services) is a SAML2
provider that offers Single-Sign-On towards an Active Directory service.

To set up Linkurious authentication with ADFS, Linkurious has to be configured as a *Relying Party Trust* in ADFS.
