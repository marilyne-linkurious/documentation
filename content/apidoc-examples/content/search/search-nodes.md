Here we will learn how to use the Search API to retrieves nodes for which at least one property
matches with the string `{{example.searchquery}}`. We will use the `GET /api/:dataSource/search/:type` API.

Search requests can have a `fuzziness` parameter that specify how accurately the search results have to match
the search query. A fuzziness value of `1` means that the search results have to match exactly; using fuzziness
values going towards `0`, search results will be more generic but the search request will be more resilient to typos.

Search results are grouped by categories. So, for example:
- `results[0].categories` is the collection of categories for the first group
- `results[0].children` are the actual nodes returned for this group
- `results[0].children[0]` is the first node (or edge) that matches the search query 

{{editfile:searchnodes.js}}
