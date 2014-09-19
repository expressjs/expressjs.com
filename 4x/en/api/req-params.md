This property is an object containing properties mapped to the named route "parameters". For example, if you have the route `/user/:name`, then the "name" property is available to you as `req.params.name`. This object defaults to `{}`.

```
// GET /user/tj
req.params.name
// => "tj"
```

When a regular expression is used for the route definition, capture groups are provided in the array using `req.params[N]`, where `N` is the nth capture group. This rule is applied to unnamed wild-card matches with string routes such as `/file/*`:

```
// GET /file/javascripts/jquery.js
req.params[0]
// => "javascripts/jquery.js"
```
