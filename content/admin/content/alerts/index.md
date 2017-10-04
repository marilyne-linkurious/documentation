Alerts are a way to watch your graph database for specific patterns and be notified
when such pattern appears in the data. 
A simple classification interface let the users navigate through pattern matches and flag
them as *confirmed* or *dismissed*.

> Alerts are a supported only for Neo4j in Linkurious {{package.version}}.

If you are interested in alerts from other graph vendors, please [get in touch](/support).

## How alerts work

To create an alert, an administrator needs to:

- Write a graph pattern query (e.g. a [Cypher query](https://neo4j.com/developer/cypher-query-language/) in the case of Neo4j)

- Configure optional columns to be returned along with the match

From the *Create alert* view is possible to first *preview* the alert:

![](create-alert1.png)

> Columns have to explicitly returned in the Cypher query as done in the image for *n.length*.

Clicking *Next*, a secondary configuration page will ask for the name of the alert and the *frequency*
on which the query is going to run.

![](create-alert2.png)

After configuring the alert, users will have access to all alerts in the *Alerts* panel of Linkurious:

![](alert-list.png)

Opening an alerts will list all recent matches sortable by any column:

![](match-list.png)

Clicking on a match will open it for details:

![](match-details.png)
