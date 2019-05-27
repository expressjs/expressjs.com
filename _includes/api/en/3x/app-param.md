<h3 id='app.param'>app.param([name], callback)</h3>

Map logic to route parameters. For example when `:user`
is present in a route path you may map user loading logic to automatically
provide `req.user` to the route, or perform validations
on the parameter input.

The following snippet illustrates how the `callback`
is much like middleware, thus supporting async operations, however
providing the additional value of the parameter, here named as `id`.
An attempt to load the user is then performed, assigning `req.user`,
otherwise passing an error to `next(err)`.

```js
app.param('user', function (req, res, next, id) {
  User.find(id, function (err, user) {
    if (err) {
      next(err)
    } else if (user) {
      req.user = user
      next()
    } else {
      next(new Error('failed to load user'))
    }
  })
})
```

Alternatively you may pass only a `callback`, in which
case you have the opportunity to alter the `app.param()` API.
For example the <a href="http://github.com/expressjs/express-params">express-params</a>
defines the following callback which allows you to restrict parameters to a given
regular expression.

This example is a bit more advanced, checking if the second argument is a regular
expression, returning the callback which acts much like the "user" param example.

```js
app.param(function (name, fn) {
  if (fn instanceof RegExp) {
    return function (req, res, next, val) {
      var captures
      if ((captures = fn.exec(String(val)))) {
        req.params[name] = captures
        next()
      } else {
        next('route')
      }
    }
  }
})
```

The method could now be used to effectively validate parameters, or also
parse them to provide capture groups:

```js
app.param('id', /^\d+$/)

app.get('/user/:id', function (req, res) {
  res.send('user ' + req.params.id)
})

app.param('range', /^(\w+)\.\.(\w+)?$/)

app.get('/range/:range', function (req, res) {
  var range = req.params.range
  res.send('from ' + range[1] + ' to ' + range[2])
})
```
