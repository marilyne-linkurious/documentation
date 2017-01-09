
The default values for **Match TTL**, **Maximum match** and **Maximum runtime**
can be set in the configuration file ({{config}}) under the `alert` key:

```
alert: {
  maxMatchTTL: 30,
  maxMatchesLimit: 5000,
  maxRuntimeLimit: 600000,
  maxConcurrency: 1
}
```

The `maxConcurrency` key indicates how many alert queries can be run concurrently.
This is useful when you configure multiple alerts and want to prevent them from
running at the same time to limit load on the graph database server.
