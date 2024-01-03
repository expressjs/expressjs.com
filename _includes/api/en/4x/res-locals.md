<h3 id='res.locals'>res.locals</h3>

Use this property to set variables accessible in templates rendered with [res.render](#res.render).
The variables set on `res.locals` are available within a single request-response cycle, and will not
be shared between requests.

<div class="doc-box doc-warn" markdown="1">
The `locals` object is used by view engines to render a response. The object
keys may be particularly sensitive and should not contain user-controlled
input, as it may affect the operation of the view engine or provide a path to
cross-site scripting. Consult the documentation for the used view engine for
additional considerations.
</div>

In order to keep local variables for use in template rendering between requests, use
[app.locals](#app.locals) instead.

This property is useful for exposing request-level information such as the request path name,
authenticated user, user settings, and so on to templates rendered within the application.

```js
app.use(function (req, res, next) {
  // Make `user` and `authenticated` available in templates
  res.locals.user = req.user
  res.locals.authenticated = !req.user.anonymous
  next()
})
```
