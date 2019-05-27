<h3 id='req.params'>req.params</h3>

This property is an object containing properties mapped to the [named route "parameters"](/{{ page.lang }}/guide/routing.html#route-parameters). For example, if you have the route `/user/:name`, then the "name" property is available as `req.params.name`. This object defaults to `{}`.

```js
// GET /user/tj
console.dir(req.params.name)
// => 'tj'
```

When you use a regular expression for the route definition, capture groups are provided in the array using `req.params[n]`, where `n` is the n<sup>th</sup> capture group. This rule is applied to unnamed wild card matches with string routes such as `/file/*`:

```js
// GET /file/javascripts/jquery.js
console.dir(req.params[0])
// => 'javascripts/jquery.js'
```

If you need to make changes to a key in `req.params`, use the [app.param](/{{ page.lang }}/4x/api.html#app.param) handler. Changes are applicable only to [parameters](/{{ page.lang }}/guide/routing.html#route-parameters) already defined in the route path.

Any changes made to the `req.params` object in a middleware or route handler will be reset.

<div class="doc-box doc-info" markdown="1">
NOTE: Express automatically decodes the values in `req.params` (using `decodeURIComponent`).
</div>
