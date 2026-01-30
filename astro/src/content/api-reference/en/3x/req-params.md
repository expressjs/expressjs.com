<h3 id='req.params'>req.params</h3>

This property is an array containing properties mapped to the named route "parameters".
For example if you have the route `/user/:name`, then the "name" property
is available to you as `req.params.name`. This object defaults to `{}`.

```js
// GET /user/tj
console.dir(req.params.name)
// => 'tj'
```

When a regular expression is used for the route definition, capture groups
are provided in the array using `req.params[N]`, where `N`
is the nth capture group. This rule is applied to unnamed wild-card matches
with string routes such as `/file/*`:

```js
// GET /file/javascripts/jquery.js
console.dir(req.params[0])
// => 'javascripts/jquery.js'
```
