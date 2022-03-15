<h3 id='app.locals'>app.locals</h3>

The `app.locals` object has properties that are local variables within the application,
and will be available in templates rendered with [res.render](#res.render).

```js
console.dir(app.locals.title)
// => 'My App'

console.dir(app.locals.email)
// => 'me@myapp.com'
```

Once set, the value of `app.locals` properties persist throughout the life of the application,
in contrast with [res.locals](#res.locals) properties that
are valid only for the lifetime of the request.

You can access local variables in templates rendered within the application.
This is useful for providing helper functions to templates, as well as application-level data.
Local variables are available in middleware via `req.app.locals` (see [req.app](#req.app))

```js
app.locals.title = 'My App'
app.locals.strftime = require('strftime')
app.locals.email = 'me@myapp.com'
```
