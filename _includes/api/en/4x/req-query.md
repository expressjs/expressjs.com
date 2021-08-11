<h3 id='req.query'>req.query</h3>

This property is an object containing a property for each query string parameter in the route.
When [query parser](#app.settings.table) is set to disabled, it is an empty object `{}`, otherwise it is the result of the configured query parser.

<div class="doc-box doc-warn" markdown="1">
As `req.query`'s shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. For example, `req.query.foo.toString()` may fail in multiple ways, for example `foo` may not be there or may not be a string, and `toString` may not be a function and instead a string or other user-input.
</div>
