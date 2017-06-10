<h3 id='req.param'>req.param(name)</h3>

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

Direct access to `req.body`, `req.params`,
and `req.query` should be favoured for clarity - unless
you truly accept input from each object.
