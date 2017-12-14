By default, the guest mode is disabled.
To enable it, set the `guestMode` key to `true` within the `access` configuration object.

A new user will appear in the [user list](/users/#creating-users) with the email `guest@linkurio.us`.

To enable the guest user for a specific data-source, you must [assign to it one or more groups](/users/#assigning-users-to-groups) for that data-source.
We recommend using the "Read Only" group for the guest user.

The guest user can only access a special workspace (located at http://localhost:3000/guest by default)
and it cannot make any changes to graph data or visualizations.
