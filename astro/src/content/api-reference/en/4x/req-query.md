<h3 id='req.query'>req.query</h3>

This property is an object containing a property for each query string parameter in the route.
When [query parser](#app.settings.table) is set to disabled, it is an empty object `{}`, otherwise it is the result of the configured query parser.

<div class="doc-box doc-warn" markdown="1">
As `req.query`'s shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. For example, `req.query.foo.toString()` may fail in multiple ways, for example `foo` may not be there or may not be a string, and `toString` may not be a function and instead a string or other user-input.
</div>

The value of this property can be configured with the [query parser application setting](#app.settings.table) to work how your application needs it. A very popular query string parser is the [`qs` module](https://www.npmjs.org/package/qs), and this is used by default. The `qs` module is very configurable with many settings, and it may be desirable to use different settings than the default to populate `req.query`:

```js
var qs = require('qs')
app.set('query parser', function (str) {
  return qs.parse(str, { /* custom options */ })
})
```

Check out the [query parser application setting](#app.settings.table) documentation for other customization options.
