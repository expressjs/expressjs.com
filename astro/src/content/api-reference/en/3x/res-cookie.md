<h3 id='res.cookie'>res.cookie(name, value, [options])</h3>

Set cookie `name` to `value`, which may be a string or object converted to JSON. The `path`
option defaults to "/".

```js
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
```

The `maxAge` option is a convenience option for setting "expires"
relative to the current time in milliseconds. The following is equivalent to
the previous example.

```js
res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
```

An object may be passed which is then serialized as JSON, which is
automatically parsed by the `bodyParser()` middleware.

```js
res.cookie('cart', { items: [1, 2, 3] })
res.cookie('cart', { items: [1, 2, 3] }, { maxAge: 900000 })
```

Signed cookies are also supported through this method. Simply
pass the `signed` option. When given `res.cookie()`
will use the secret passed to `express.cookieParser(secret)`
to sign the value.

```js
res.cookie('name', 'tobi', { signed: true })
```

Later you may access this value through the <a href="#req.signedCookies">req.signedCookie</a>
object.
