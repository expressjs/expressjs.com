Sets cookie `name` to `value`.  The `value` parameter may be a string or object converted to JSON.

The `options` parameter is an object that can have the following properties.

| Property    | Type |  Description                                                             |
|-------------|-------------------------------------------------------------------------|
| `domain`    | String | Domain name for the cookie. Defaults to the domain name of the app.
| `path`      | String | Path for the cookie. Defaults to "/".
| `secure`    | Boolean | Marks the cookie to be used with HTTPS only.
| `expires`   | Date | Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
| `maxAge`    | String | Convenient option for setting the expiry time relative to the current time in milliseconds.
| `httpOnly`  | Boolean | Flags the cookie to be accessible only by the web server.
| `signed`    | Boolean | Indicates if the cookie should be signed.

<div class="doc-box doc-notice">
All `res.cookie()` does is set the HTTP `Set-Cookie` header with the options provided.
Any option not specified defaults to the value stated in [RFC 6265](http://tools.ietf.org/html/rfc6265).
</div>

For example:

```js
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
```

The `maxAge` option is a convenience option for setting "expires" relative to the current time in milliseconds.
The following is equivalent to the second example above.

```js
res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
```

You can pass an object as the `value` parameter; it is then serialized as JSON and parsed by `bodyParser()` middleware.

```js
res.cookie('cart', { items: [1,2,3] });
res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
```

When using [cookie-parser](https://www.npmjs.com/package/cookie-parser) middleware, this method also
supports signed cookies. Simply include the `signed` option set to `true`.
Then `res.cookie()` will use the secret passed to `cookieParser(secret)` to sign the value.

```js
res.cookie('name', 'tobi', { signed: true });
```

Later you may access this value through the [req.signedCookie](#req.signedCookies) object.
