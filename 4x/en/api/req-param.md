Return the value of param `name` when present.

```js
// ?name=tobi
req.param('name')
// => "tobi"

// POST name=tobi
req.param('name')
// => "tobi"

// /user/tobi for /user/:name 
req.param('name')
// => "tobi"
```

Lookup is performed in the following order:

* `req.params`
* `req.body`
* `req.query`

Optionally, you can specify `defaultValue` to set a default value if the parameter is not found in any of the request objects.

Direct access to `req.body`, `req.params`, and `req.query` should be favoured for clarity - unless you truly accept input from each object.
