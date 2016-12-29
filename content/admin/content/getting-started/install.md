# Installing

## Linux systems
1. Unzip Linkurious' archive: `>unzip linkurious-linux-v{{package.version}}.zip`
2. Enter the Linkurious folder: `>cd linkurious-linux`
3. Check the configuration file at `linkurious-linux/data/config/production.json` (see [how to configure a data-source](/configure-sources))
4. Make Java JDK 7+ is installed (type `javac -version` in a terminal), if needed, [install Java](/requirements/#java-jdk).  
5. Run the script at `linkurious-linux/start.sh`.

## Windows systems

1. Unzip Linkurious' archive (right-click on the file, then "Extract all")
2. Enter the `linkurious-windows` folder
3. Check the configuration file at `linkurious-windows/data/config/production.json` (see [how to configure a data-source](/configure-sources)) 
4. Make sure that you have Oracle Java JDK 7+ installed (see [Java JDK requirements](/requirements/#java-jdk))
5. Double-click on `start.bat` in `linkurious-windows`.

> The firewall of Windows might ask you to authorize connections with Linkurious.
>
> If so, click on Authorize access.

## Mac OS X systems

1. Unzip Linkurious' archive: `>unzip linkurious-osx-v{{package.version}}.zip`
2. Enter the Linkurious folder: `>cd linkurious-osx`
3. Check the configuration file at `linkurious-osx/data/config/production.json` (see [how to configure a data-source](/configure-sources))
4. Make Java JDK 7+ is installed (type `javac -version` in a terminal), if needed, [install Java](/requirements/#java-jdk).  
5. Run the script at `linkurious-osx/start.sh.command`.
