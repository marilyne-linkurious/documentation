

Linkurious relies on a [role-based access control](https://en.wikipedia.org/wiki/Role-based_access_control)
model based on *node-categories* and *edge-types*:

- *Users* belong to one of many *user-groups*
- *User-groups* have multiple *access-rights*
- Each *access-right* gives access to a given *node-category* or *edge-type* with a certain right:
   - `none` (no access)
   - `read` (read-only access)
   - `write` (read and write access)

If a users belongs to multiple user-groups and has different access-rights defined for a given
node-category (or edge-type), then highest attributed right is applied.

## Example

- User `Foo` belong to User-groups `Accounting` and `Sales`
- User-group `Accounting` has:
   - READ access to node-category `COMPANY`
   - WRITE access to node-category `CONTRACT`
- User-group `Sales` has:
   - READ access to node-category `CONTRACT`
   - WRITE access to node-category `CUSTOMER`
- **Result**:
   - User `Foo` has READ access to node-category `COMPANY` (through User-group `Accounting`)
   - User `Foo` has WRITE access to node-category `CONTRACT`  (through User-group `Accounting`)
   - User `Foo` has WRITE access to node-category `CUSTOMER`  (through User-group `Sales`)

## Creating users, groups and rights

To create users, user-groups and access-rights, administrators can use the Web user interface
via the *Admin* > *Users* menu:
![admin-users menu](menu-admin-users.png)

## Password hashing

When an administrator create users, their password is hashed using the
[PBKDF2 algorithm](https://en.wikipedia.org/wiki/PBKDF2) with the following parameters:

- iterations: 1000
- salt length: 96 bits
- key length: 256 bytes

## External users

If you use an external source for authentication (LDAP, Active Directory, OpenID Connect etc.),
a user will be created in Linkurious automatically at each user's first connection.

The shadow-user created in Linkurious is only users to store user preferences and
be linked to user-groups and other objects (visualizations, etc.).
The password of external users in never stored in Linkurious.

The user-group that will attributed to these users is the `Default` user-group (with read-all access),
unless you specify a group ID in `access.externalUserDefaultGroupId`
(see details on [how to configure access](/access)).
