
## Configuring access

The user-access system is configured within the `access` configuration 
key in the configuration file ({{config}}):

- `authRequired` (default: `false`): `true` to reject requests anonymous sessions, see [how to enable authentication](/enabling-auth).
- `dataEdition` (default: `true`): Enable the creation, edition, and deletion of nodes and edges in all data-sources.
   Permissions can be fine-tuned for each user-group, see [the documentation about users and groups](/users).
   If `false`, all edition requests sent through Linkurious to the data-sources will be rejected.
- `widget` (default: `true`): Enable to publish visualizations online.
   Published visualizations are accessible by anonymous users.
- `externalUserDefaultGroupId`: Default *group id* automatically set for new external users (from LDAP, AD or any other external provider).
- `externalUsersGroupMapping`: How to map external groups to Linkurious groups (see [how to configure group mapping](/users/#group-mapping)).
- `ldap`: The connection to the LDAP service (see [how to configure LDAP](/ldap/#openldap)).
- `msActiveDirectory`: The connection to the Microsoft Active Directory service (see [how to configure Active Directory](/ldap/#active-directory)).
- `oauth2`: The connection to an OAuth2/OpenID Connect identity provider.
- `floatingLicenses` (default: `Infinity`): The maximum number of users that can connect to Linkurious at the same time.

<!-- 
`loginTimeout` (: 3600. Log the user out after a period of inactivity (in second). 
-->

## Local vs. external authentication

To access Linkurious when `authRequired` is `true`, users need accounts in Linkurious.
Administrators can create accounts directly in Linkurious (see [how to create users](/users))
or rely on an external authentication service.
Linkurious supports the following external authentication services:
 - [LDAP](/ldap/#openldap)
 - [Active Directory](/ldap/#active-directory)
 - [Microsoft Azure Active Directory (with Single Sign-On)](/sso-azure)
 - [Google Suite (with Single Sign-On)](/sso-google)
 - or [any OpenID Connect compatible service](/sso-openid)

If your company uses an authentication service that Linkurious does not support yet,
please [get in touch](/support).
