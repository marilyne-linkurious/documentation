
Audit trails allows you to record detailed logs about the operations performed on your 
graph database by Linkurious users.
This feature is disabled by default.

The following settings are available in the configuration file ({{config}}) within the `auditTrail` key:

- `enabled` (default: `false`): Whether to enable audit trail recording.
- `logFolder` (default: `"audit-trail"`): Where to store the log files. This path is relative to the `linkurious/data` directory.
- `fileSizeLimit` (default: `5242880`, i.e. 5MB): Maximum size of one log file in byte. A new file is created when the limit is reached (files rotations) to avoid big log files.
- `strictMode` (default: `false`): Whether to ensure that each operation is been logged before returning its result to the user. Might have a big impact on the server responsiveness.
- `mode` (default: `"rw"`, read and write): Which kind of user operation to log (`"r"` for read, `"w"` for write, `"rw"` for both).
- `logResult` (default: `true`): Whether to include the result of each operation in the log
