## Configuring access control

The access control is configured within the `access` configuration 
key in the configuration file ({{config}}):

- `authRequired` (default: `false`): Whether to require authentication, see [how to enable authentication](/enabling-auth).

- `dataEdition` (default: `true`): Enable the creation, edition, and deletion of nodes and edges in all data-sources.
   Permissions can be fine-tuned for each user-group, see [the documentation about users and groups](/users).
   If set to `false`, all edition requests sent through Linkurious to the data-sources will be rejected.
   
- `widget` (default: `true`): Enable to publish visualizations online.
   Published visualizations are *always accessible* by anonymous users.
  
- `externalUsersGroupMapping` (optional): How to map external groups to Linkurious groups
  (see [how to configure group mapping](/users/#group-mapping)).

- `externalUsersAllowedGroups` (optional): List of external groups of users allowed to log in into Linkurious.
  
- `externalUserDefaultGroupId` (optional): Default *group id* automatically set for new external users
  when no other rule is set in `externalUsersGroupMapping`.
  
- `ldap` (optional): The connection to the LDAP service (see [how to configure LDAP](/ldap/#openldap)).

- `msActiveDirectory` (optional): The connection to the Microsoft Active Directory service
  (see [how to configure Active Directory](/ldap/#active-directory)).
  
- `oauth2` (optional): The connection to an OAuth2/OpenID Connect identity provider
  (see how to configure [Azure AD](/sso-azure), [Google](/sso-google) or [a generic OpenID Connect provider](/sso-openid)).

- `saml2` (optional): The connection to a SAML2 identity provider (see [how to configure SAML2 / ADFS](/sso-saml)).

- `floatingLicenses` (default: `Infinity`): The maximum number of users that can connect to Linkurious at the same time.

## Local vs. external authentication

To access Linkurious when `authRequired` is `true`, users need accounts in Linkurious.
Administrators can create accounts directly in Linkurious (see [how to create users](/users))
or rely on an external authentication service.

Linkurious supports the following external authentication services:
 - [LDAP](/ldap/#openldap)
 - [Microsoft Active Directory](/ldap/#active-directory)
 - [Microsoft Azure Active Directory](/sso-azure)
 - [Google Suite](/sso-google)
 - [OpenID Connect](/sso-openid)
 - [SAML2 / ADFS](/sso-saml)

If your company uses an authentication service that Linkurious does not support yet,
please [get in touch](/support).
