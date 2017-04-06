
Linkurious uses an SQL database to store user-data. The database contains:
- visualizations
- users
- user-groups
- access-rights

By default, the user-data store is a [SQLite](https://sqlite.org/about.html) *file-based* database.
This makes Linkurious easy to deploy.

For deployment at scale (more than a couple users), we recommend switching to
one of the supported *server-based* databases:
 - [MySQL](https://www.mysql.com/products/community/)
 - [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/)
 - [MariaDB](https://mariadb.org/about/)

## Configure with SQLite
SQLite if the default user-data store of Linkurious.

```js
"db": {
    "name": "linkurious",
    "options": {
      "dialect": "sqlite"
      "storage": "server/database.sqlite"
    }
}
```

## Configure with MySQL
```js
"db": {
    "name": "linkurious",
    "username": "MYSQL_USER_NAME",
    "password": "MYSQL_PASSWORD",
    "options": {
      "dialect": "mysql",
      "host": "MYSQL_HOST",
      "port": 3306
    }
}
```

## Configure with Microsoft SQL Server
```js
"db": {
    "name": "linkurious",
    "username": "MSSQL_USER_NAME",
    "password": "MSSQL_PASSWORD",
    "options": {
      "dialect": "mssql",
      "host": "MSSQL_HOST",
      "port": 1433
    }
}
```

## Configure with MariaDB
```js
"db": {
    "name": "linkurious",
    "username": "MARIADB_USER_NAME",
    "password": "MARIADB_PASSWORD",
    "options": {
      "dialect": "mariadb",
      "host": "MARIADB_HOST",
      "port": 3306
    }
}
```
