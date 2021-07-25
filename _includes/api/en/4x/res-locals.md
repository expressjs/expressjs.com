<h3 id='res.app.locals'>res.app.locals</h3>

An object that contains response local variables scoped to the request, and therefore available only to
the view(s) rendered during that request / response cycle (if any). Otherwise,
this property is identical to [app.locals](#app.locals).

This property is useful for exposing request-level information such as the request path name,
authenticated user, user settings, and so on.

```js
app.use(function (req, res, next) {
  res.app.locals.user = req.user
  res.app.locals.authenticated = !req.user.anonymous
  next()
})
```
