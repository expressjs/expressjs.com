<h3 id='app.all'>app.all(path, callback [, callback ...])</h3>

This method is like the standard [app.METHOD()](#app.METHOD) methods,
except it matches all HTTP verbs.

{% include api/en/4x/routing-args.html %}

#### Examples

The following callback is executed for requests to `/secret` whether using
GET, POST, PUT, DELETE, or any other HTTP request method:

```js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

The `app.all()` method is useful for mapping "global" logic for specific path prefixes or arbitrary matches.  For example, if you put the following at the top of all other
route definitions, it requires that all routes from that point on
require authentication, and automatically load a user. Keep in mind
that these callbacks do not have to act as end-points: `loadUser`
can perform a task, then call `next()` to continue matching subsequent
routes.

```js
app.all('*', requireAuthentication, loadUser)
```

Or the equivalent:

```js
app.all('*', requireAuthentication)
app.all('*', loadUser)
```

Another example is white-listed "global" functionality.
The example is similar to the ones above, but it only restricts paths that start with
"/api":

```js
app.all('/api/*', requireAuthentication)
```
