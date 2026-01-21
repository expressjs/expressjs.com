<h3 id='app.all'>app.all(path, [callback...], callback)</h3>

This method functions just like the `app.VERB()` methods,
however it matches all HTTP verbs.

This method is extremely useful for
mapping "global" logic for specific path prefixes or arbitrary matches.
For example if you placed the following route at the top of all other
route definitions, it would require that all routes from that point on
would require authentication, and automatically load a user. Keep in mind
that these callbacks do not have to act as end points, `loadUser`
can perform a task, then `next()` to continue matching subsequent
routes.

```js
app.all('*', requireAuthentication, loadUser)
```

Or the equivalent:

```js
app.all('*', requireAuthentication)
app.all('*', loadUser)
```

Another great example of this is white-listed "global" functionality. Here
the example is much like before, however only restricting paths prefixed with
"/api":

```js
app.all('/api/*', requireAuthentication)
```
