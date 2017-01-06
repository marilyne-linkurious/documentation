
## Configuring access

The user-access system is configured within the `access` configuration key in the configuration file (`linkurious/data/config/{{config.file}}`):

- `authRequired` (default: `false`): `true` to reject requests anonymous sessions.
   If `false`, all sessions will belong to a `"Unique User"` account.
   Set to `false` to launch Linkurious for the first time and create account, or if there is a single user.
- `dataEdition` (default: `true`): Enable the creation, edition, and deletion of nodes and edges in all data-sources.
   Permissions can fine-tuned for each user-group, see [the documentation about users and groups](/access-rights).
   If `false`, all edition requests sent through Linkurious to the data-sources will be rejected.
- `widget` (default: `true`): Enable to publish visualizations online.
   Published visualizations are accessible by anonymous users.
- `externalUserDefaultGroupId`: Default *group id* set automatically for new external users (from LDAP, AD or any other external provider).
- `ldap`: The connection to the LDAP service (see [how to configure LDAP](/ldap/#ldap)).
- `msActiveDirectory`: The connection to the Microsoft Active Directory service (see [how to configure Active Directory](/ldap/#active-directory)).
- `oauth2`: The connection to an OAuth2/OpenID Connect identity provider (see [how to configure SSO](/sso) to learn more)
<!-- 
`loginTimeout` (: 3600. Log the user out after a period of inactivity (in second). 
-->
