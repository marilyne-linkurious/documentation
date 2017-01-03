# Internal database

Linkurious uses an internal SQL database to store its state. The state includes:
- visualizations
- users
- user-groups
- access-rights

By default, the internal SQL database is stored as a SQLite database (file based).
This makes Linkurious easy to deploy.

Example configuration with SQLite:
```
MEH
```

For deployment at scale (more than a couple users), we recommend to change the configuration to use
an external database such as MySQL or MariaDB.

Example of configuration with MySQL:
```
MEH
```

Example of configuration with MariaDB:
```
MEH
```
