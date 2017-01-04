## Linux systems
1. Unzip Linkurious' archive: `>unzip linkurious-linux-v{{package.version}}.zip`
2. Enter the Linkurious folder: `>cd linkurious-linux`
3. Check the configuration file at `linkurious-linux/data/config/{{config.file}}` (see [how to configure a data-source](/configure-sources))
4. Make Java JDK 7+ is installed (type `javac -version` in a terminal), if needed, [install Java](/requirements/#java-jdk).  

See [how to start Linkurious on Linux](/start/#linux-systems).

## Windows systems

1. Unzip Linkurious' archive (right-click on the file, then "Extract all")
2. Enter the `linkurious-windows` folder
3. Check the configuration file at `linkurious-windows/data/config/{{config.file}}` (see [how to configure a data-source](/configure-sources)) 
4. Make sure that you have Oracle Java JDK 7+ installed (see [Java JDK requirements](/requirements/#java-jdk))

See [how to start Linkurious on Windows](/start/#windows-systems).

## Mac OS X systems

1. Unzip Linkurious' archive: `>unzip linkurious-osx-v{{package.version}}.zip`
2. Enter the Linkurious folder: `>cd linkurious-osx`
3. Check the configuration file at `linkurious-osx/data/config/{{config.file}}` (see [how to configure a data-source](/configure-sources))
4. Make Java JDK 7+ is installed (type `javac -version` in a terminal), if needed, [install Java](/requirements/#java-jdk).  

See [how to start Linkurious on Mac OS X](/start/#mac-os-x-systems).

# Installing as a service.

In order to run Linkurious automatically when the operating system starts, it is possible to install 
Linkurious as a system service on *Linux* and *Mac OS X*.

## Linux systems

1. Open the administration menu by running `menu.sh` in the `linkurious-linux` folder.
2. Check if Linkurious is already installed as a service (displayed at the top of the menu).
3. Select `Install Linkurious as a service`.
4. Linkurious will install itself as a service of your operating system.

## Mac OS X systems

1. Open the administration menu by running `menu.sh.command` in the `linkurious-linux` folder.
2. Check if Linkurious is already installed as a service (displayed at the top of the menu).
3. Select `Install Linkurious as a service`.
4. Linkurious will install itself as a service of your operating system.

# Installing multiple instances

> A single instance of Linkurious can connect to multiple graph databases.

Linkurious is designed to run a single instance per machine.
While it is not recommended and with no guarantee to work, it is possible to run multiple instances of Linkurious by doing the following:

Copy the entire linkurious directory to a new place, and edit the `data/config/{{config.file}}` file:
You will need to change `listenPort` to set a different port from the one used in the original `{{config.file}}` file.
You may also edit `graphdb` and `db.storage`.

This is an example of a second instance of Linkurious served on `http://localhost:3001`, that calls the Neo4j API on the port `7475`:

```js
{
  "dataSources": [{
    "graphdb": {
      "vendor": "neo4j",
      "url": "http://localhost:7475"
    },
    "index": {
      "vendor": "elasticSearch",
      "host": "localhost",
      "port": 9201
    }
  }],
  "db": {
    "username": null,
    "password": null,
    "logging": true,
    "options": {
      "dialect": "sqlite",
      "storage": "database_secondInstance.sqlite"
    }
  },
  "server": {
    "listenPort": 3001,
    "clientFolder": "/public",
    "cookieSecret": "zO6Yb7u5H907dfEcmjS8pXgWNEo3B9pNQF8mKjdzRR3I64o88GrGLWEjqNq1Yx5"
  }
}
```

If you use the Elasticsearch software bundled with Linkurious, you will also need to
modify the configuration in `system/elasticsearch/config/elasticsearch.yml` to set an alternate port
to the default of 9201.

Finally, note that it is not currently possible to install different versions of Linkurious
as a system service, at the same time, on the same machine.
