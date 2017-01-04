If you follow this procedure, you will be able to update Linkurious to a newer version
without loosing your configuration and user-data store.
You data will be automatically migrated to the never version.

Before updating, make sure that you have [backed-up your data](/backup)
in case something unexpected happens.

During the update procedure, if Linkurious is running, it will be stopped.
You will need to re-start Linkurious after the update procedure.

1. Download the newer version you wish to install (see [how to download Linkurious](/download))
2. Copy `linkurious-xxx-v{{package.version}}.zip` in your current Linkurious directory (along the `start` `stop` and `update` scripts)
3. Run the update script (Linux: `update.sh`, OSX: `update.sh.command`, Windows: `update.bat`)
4. Done! You can restart Linkurious.

## Troubleshooting

If the update script fails, please check the update log located
at `linkurious/data/update.log` for details.
