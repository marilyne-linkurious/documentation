Linkurious is a Web-application server. It needs to be installed on a server and can then be accessed by multiple users using their Web browser.

## Linkurious Server

Technical requirements for the machine used to install the Linkurious Web-application server.

### Hardware

For a standard installation of Linkurious, the recommended hardware is:
 - 32GB of RAM
 - 8 CPU cores
 - 50GB of free space (SSD preferred)
  
Please keep in mind that these technical requirements are for Linkurious server only.
For hardware requirements regarding your graph database, please refer to these guides:
- [Neo4j: hardware sizing calculator](https://neo4j.com/hardware-sizing-calculator/)
- [JanusGraph: *Google Groups* discussion on hardware requirements](https://groups.google.com/forum/#!topic/aureliusgraphs/0wWk9AzHyTM)
- [DataStax Enterprise Graph: hardware requirements](https://docs.datastax.com/en/landing_page/doc/landing_page/planning/planningHardware.html)
- [AllegroGraph: hardware and performance tuning](http://franz.com/agraph/allegrograph/agraph_performance_tuning.lhtml)
- [Stardog: capacity planning](http://www.stardog.com/docs/#_capacity_planning)
<!-- todo: for janusgrpah, add a link to http://docs.janusgraph.org/latest/cassandra.html -->

#### {{es}}

Linkurious includes an embedded {{es}} instance for search capabilities.
Please keep in mind that this embedded instance will only work for smaller graphs (less than 50M nodes + edges).
For larger graphs, you will need to deploy an {{es}} cluster.
Please refer to [{{es}}'s hardware requirements guide](https://www.elastic.co/guide/en/elasticsearch/guide/current/hardware.html) for details.

### Operating System

Linkurious server can be deployed on the following platforms:
- Windows
  - Windows 7
  - Windows 8
  - Windows 8.1
  - Windows 10
  - Windows Server 2012
- Linux
  - CentOS 7+
  - Ubuntu 12.10+
  - Gentoo 12+
  - Debian 8+
  - Mint 14+
- Mac OS X
  - OS X 10.10+ (OS X Lion and more recent)

### Java

Linkurious embedded [{{es}}]({{es.product.link}}) engine requires *Java JRE (or JDK)* 7+.

You can [download the latest JRE from Oracle's website](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html).
<!-- from: http://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html -->

Installation instructions:
 - [Windows systems](https://docs.oracle.com/javase/8/docs/technotes/guides/install/windows_server_jre.html)
 - [Linux systems](https://docs.oracle.com/javase/8/docs/technotes/guides/install/linux_server_jre.html)
 - [Mac OS X systems](https://docs.oracle.com/javase/8/docs/technotes/guides/install/mac_jre.html)

The `JAVA_HOME` environment variable should be set.

### SQLite and GLIBC 2.14

Linkurious uses an embedded SQLite store for user-data persistence. This database requires GLIBC >= 2.14.
Some older Linux distributions don't have this version of GLIBC available.
You can check the version available on your system on http://distrowatch.com.

If SQLite does not work on your system, please refer to the [user-data store documentation](/user-data-store) section to learn how to use alternative databases.

## Linkurious Client

Technical requirements for users who want to access Linkurious with their Web browser.

### Hardware

Hardware requirements of the Linkurious Web client vary with the size of the visualized graphs.
For up to 500 nodes and edges in a single visualization, we recommend to use a machine with
4 GB RAM, and 2 CPU cores @ 1.6 Ghz.

The minimal screen resolution is 1024 x 768.

### Web Browser

End-users will access Linkurious through a Web browser. All modern browsers are supported:
- Chrome 23+ (fastest)
- Internet Explorer 10+
- Firefox 17+
- Opera 12+
<!-- todo: add Safari (check compatible version) -->
