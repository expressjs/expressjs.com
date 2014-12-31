Set cookie `name` to `value`, which may be a string or object converted to JSON. The `options` object can have the following properties.

| Property    | Description                                                             |
|-------------|-------------------------------------------------------------------------|
| `domain`    | Domain name for the cookie. Defaults to the domain name of the app.
| `path`      | Path for the cookie. Defaults to "/".
| `secure`    | Marks the cookie to be used with HTTPS only.
| `expires`   | Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
| `maxAge`    | Convenient option for setting the expiry time relative to the current time in seconds.
| `httpOnly`  | Flags the cookie to be accessible only by the web server.
| `signed`    | Indicates if the cookie should be signed.

<div class="doc-box doc-notice">
All `res.cookie()` does is set the HTTP `Set-Cookie` header with the options provided, any option which is not passed defaults to the behavior as specified in [RFC 6265](http://tools.ietf.org/html/rfc6265).
</div>

The following are some examples of setting cookie with various options.

```js
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
```

The `maxAge` option is a convenience option for setting "expires" relative to the current time in milliseconds. The following is equivalent to the previous example.

```js
res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
```

An object may be passed which is then serialized as JSON, which is automatically parsed by the `bodyParser()` middleware.

```js
res.cookie('cart', { items: [1,2,3] });
res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
```

 Signed cookies are also supported through this method. Simply pass the `signed` option. When given `res.cookie()` will use the secret passed to `cookieParser(secret)` to sign the value.

```js
res.cookie('name', 'tobi', { signed: true });
```

Later you may access this value through the [req.signedCookie](#req.signedCookies) object.
