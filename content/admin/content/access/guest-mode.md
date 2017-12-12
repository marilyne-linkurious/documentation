By default, the guest mode is disabled.
To enable it, set to `true` the `guestModeAllowed` configuration key inside the `access` configuration.

A new user will appear in the [user list](/users/#creating-users) with the email `guest@linkurio.us`.
This special user can only access the workspace and it can't save any visualization. Its access rights
are defined exactly like a regular user by [assigning to it one or more groups](/users/#assigning-users-to-groups).
