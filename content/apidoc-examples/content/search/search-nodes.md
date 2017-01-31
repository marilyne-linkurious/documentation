Here we will learn how to use the **Search API** to retrieves nodes for which at least one property
matches with the string `{{example.searchquery}}`. We will use the `GET /api/:dataSource/search/:type/full` API with an API key that has the `graphItem.search` access-right.

Search requests can have a `fuzziness` parameter that specify how accurately the search results have to match
the search query. A fuzziness value of `1` means that the search results have to match exactly; instead, using fuzziness
values going towards `0`, search results will be more generic but the search request will be more resilient to typos.

{{editfile:searchnodes.js}}
