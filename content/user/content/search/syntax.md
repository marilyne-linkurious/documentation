
{{lke}} uses Elasticsearch. 
You can thus use the Elasticsearch syntax detailed in the 
[Elastic query_string documentation](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax).

Simply type the following commands in the {{lke}} search
bar.

## Field name

Where the "status" field contains "active": `status:active`

Where the "title" field contains "quick" or "brown" (If you omit the 
`OR` operator the default operator will be used): 
`title:(quick OR brown), title:(quick brown)`

Where the "author" field contains the exact phrase "john smith":
`author:"John Smith"`

Where any of the fields "book.title", "book.content" or "book.date" 
contains "quick" or "brown" (note how we need to escape the `*` with a 
backslash): `book.\*:(quick brown)`

Where the field "title" has no value (or is missing): `_missing_:title`

Where the field "title" has any non-null value: `_exists_:title`

## Ranges

Ranges can be specified for date, numeric or string fields. 
Inclusive ranges are specified with square brackets [min TO max] and 
exclusive ranges with curly brackets {min TO max}.

Where the "date" fields has a values in 2012: 
`date:[2012-01-01 TO 2012-12-31]`

Where the "count" field in a number between 1 and 5: `count:[1 TO 5]`

Where the "count" field in greater than 10: `count:[10 TO *]`

Where the "date" field has a value before 2012: `date:{* TO 2012-01-01}`

Where the "count" field has a value from 1 up to but not including 5: 
`count:[1..5}`

Ranges with one side unbounded can use the following syntax:

* age:>10 
* age:>=10 
* age:<10 
* age:<=10

## Boolean operators

By default, all terms are optional, as long as one term matches. 
A search for `foo bar baz` will find any document that contains one or 
more of `foo` or `bar` or `baz`. 
We have already discussed the default_operator above which allows you 
to force all terms to be required, but there are also boolean operators 
which can be used in the query string itself to provide more control.

The preferred operators are `+` (this term must be present) and `-` 
(this term must not be present). 
All other terms are optional. 
For example, the query `quick brown +fox -news` states that: 

* "fox" must be present 
* "news" must not be present 
* "quick" and "brown" are optional — their presence increases the 
  relevance.

## Boosting

Use the boost operator `^` to make one term more relevant than another.
For instance, if we want to find all documents about foxes, but we are 
especially interested in quick foxes: `quick^2 fox`

The default boost value is 1, but can be any positive floating point 
number. 
Boosts between 0 and 1 reduce relevance.

Boosts can also be applied to phrases or to groups: 
`"john smith"^2 (foo bar)^4`

## Grouping

Multiple terms or clauses can be grouped together with parentheses, 
to form sub-queries: `(quick OR brown) AND fox`

Groups can be used to target a particular field, or to boost the result 
of a sub-query: `status:(active OR pending) title:(full text search)^2`
