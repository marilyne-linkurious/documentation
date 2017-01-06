
In Linkurious, administrators manage other user accounts.
User accounts are identified by either a login or an e-mail address.

If Linkurious is connected to an LDAP service (preferably OpenLDAP or Active Directory),
users are authenticated using the external service at each log-in.

If you have a LDAP service running in your network, you can use it to authenticate users in Linkurious. 

## OpenLDAP

For OpenLDAP compatible providers, add an `ldap` section inside the `access` section.

Allowed options in `access.ldap`:

- `enabled`           `true` to enable this authentication strategy.
- `url`:              URL of the LDAP server.
- `bindDN`:           "Domain Name" of the LDAP account used to search other accounts.
- `bindPassword`:     Password of the LDAP account used to search other accounts.
- `baseDN`:           Base "Domain Name" in which users will be searched.
- `usernameField`:    Name of the LDAP attribute containing the user's *name*.
- `emailField`:       Name of the LDAP attribute containing the user's *e-mail*.
- `groupField`:       Name of the LDAP attribute containing the user's *group*.
- `freeze`:           `true` to prevent new LDAP users from being created in Linkurious.
                      Existing users (i.e. who logged in at least once) will still be able to log-in.
- `authorizedGroups`: Array of LDAP groups that are authorized to log into Linkurious.

Example LDAP configuration:

```json
"access": {
  // [...]
  "ldap": {
    "enabled": true,
    "url": "ldap://ldap.forumsys.com:389",
    "bindDN": "cn=read-only-admin,dc=example,dc=com",
    "bindPassword": "password",
    "baseDN": "dc=example,dc=com'",
    "usernameField": "uid",
    "emailField": "mail",
    "groupField": "group",
    "authorizedGroups": ["group1", "group2"]
  }
}
```

> Contact your network administrator to ensure that the machine where Linkurious is installed can connect to the LDAP service.

## Active Directory

For Microsoft Active Directory, add a `msActiveDirectory` section inside the `access` section.

Allowed options in `access.msActiveDirectory`:

- `enabled`: `true` to enable this authentication strategy.
- `url`:     URL of the Active Directory server.
- `baseDN`:  Base "Domain Name" in which users will be searched.
- `domain`:  Domain of your Active Directory server.

Example Active Directory configuration:

```json
"access": {
  // [...]
  "msActiveDirectory": {
    "enabled": true,
    "url": "ldap://ldap.lks.com",
    "baseDN": "dc=ldap,dc=lks,dc=com",
    "domain": "ldap.lks.com"
  }
}
```
