
The Linkurious client can log user actions by sending events to your Google Analytics account.
They provide information of the way the application is used, which features are the most useful, etc.
This feature is disabled by default and no external script is injected in this case.
It is configured within the `clientAnalytics` key:

- `enabled`: (default: `false`): `true` to enable client analytics
- `widget` (default: `false`): `true` to track access to published widgets
- `code`: Universal Analytics code of the form `"UA-XXXXX-xx"`.
- `domain` (default: `"auto"`): The domain to account the tracked actions for
  (e.g. `"www.example.com"`, `"auto"` or `"none"`)
