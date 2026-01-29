<h3 id='res.locals'>res.locals</h3>

Response local variables are scoped to the request, thus only
available to the view(s) rendered during that request / response
cycle, if any. Otherwise this API is identical to <a href="#app.locals">app.locals</a>.

This object is useful for exposing request-level information such as the
request pathname, authenticated user, user settings etcetera.

```js
app.use(function (req, res, next) {
  res.locals.user = req.user
  res.locals.authenticated = !req.user.anonymous
  next()
})
```
