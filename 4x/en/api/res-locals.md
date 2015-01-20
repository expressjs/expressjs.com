Response local variables are scoped to the request, and therefore only available to
the view(s) rendered during that request / response cycle (if any). Otherwise, this API is identical to [app.locals](#app.locals).

This object is useful for exposing request-level information such as the request pathname, authenticated user, user settings etc.

```js
app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.authenticated = ! req.user.anonymous;
  next();
});
```
