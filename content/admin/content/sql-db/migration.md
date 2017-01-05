# How to migrate from SQLite to MySQL

The default storage system for Linkurious' user-data store is SQLite.

This is the procedure to migrate from SQLite to MySQL.

1. Export the SQLite database to a file:
   ```sh
   sqlite3 ./linkurious/data/server/database.sqlite .dump > export.sql
   ```
2. Load the exported database into MySQL:
   ```sh
   mysql -u MY_MYSQL_USER -p -h 127.0.0.1 linkurious < export.sql
   ```
3. [Update Linkurious configuration to connect to MySQL](/user-data-store/#configure-with-mysql)
