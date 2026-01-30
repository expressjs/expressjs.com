<h3 id='res.clearCookie'>res.clearCookie(name [, options])</h3>

Clears the cookie with the specified `name` by sending a `Set-Cookie` header that sets its expiration date in the past.
This instructs the client that the cookie has expired and is no longer valid. For more information
about available `options`, see [res.cookie()](#res.cookie).

<div class="doc-box doc-notice" markdown="1">
The `expires` and `max-age` options are being ignored completely.
</div>

<div class="doc-box doc-notice" markdown="1">
Web browsers and other compliant clients will only clear the cookie if the given
`options` is identical to those given to [res.cookie()](#res.cookie)
</div>

```js
res.cookie('name', 'tobi', { path: '/admin' })
res.clearCookie('name', { path: '/admin' })
```
