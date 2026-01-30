<h3 id='req.params'>req.params</h3>

This property is an object containing properties mapped to the [named route "parameters"](/{{ page.lang }}/guide/routing.html#route-parameters). For example, if you have the route `/user/:name`, then the "name" property is available as `req.params.name`. This object defaults to `Object.create(null)` when using string paths, but remains a standard object with a normal prototype when the path is defined with a regular expression.

```js
// GET /user/tj
console.dir(req.params.name)
// => "tj"
```

Properties corresponding to wildcard parameters are arrays containing separate path segments split on `/`:

```js
app.get('/files/*file', (req, res) => {
  console.dir(req.params.file)
  // GET /files/note.txt
  // => [ 'note.txt' ]
  // GET /files/images/image.png
  // => [ 'images', 'image.png' ]
})
```

When you use a regular expression for the route definition, capture groups are provided as integer keys using `req.params[n]`, where `n` is the n<sup>th</sup> capture group.

```js
app.use(/^\/file\/(.*)$/, (req, res) => {
  // GET /file/javascripts/jquery.js
  console.dir(req.params[0])
  // => "javascripts/jquery.js"
})
```

Named capturing groups in regular expressions behave like named route parameters. For example the group from `/^\/file\/(?<path>.*)$/` expression is available as `req.params.path`.

If you need to make changes to a key in `req.params`, use the [app.param](/{{ page.lang }}/5x/api.html#app.param) handler. Changes are applicable only to [parameters](/{{ page.lang }}/guide/routing.html#route-parameters) already defined in the route path.

Any changes made to the `req.params` object in a middleware or route handler will be reset.

{% include admonitions/note.html content="Express automatically decodes the values in `req.params` (using `decodeURIComponent`)." %}