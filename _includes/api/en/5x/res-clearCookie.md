<h3 id='res.clearCookie'>res.clearCookie(name [, options])</h3>

Clears the cookie specified by `name`. For details about the `options` object, see [res.cookie()](#res.cookie).

<div class="doc-box doc-notice" markdown="1">
Web browsers and other compliant clients will only clear the cookie if the given
`options` is identical to those given to [res.cookie()](#res.cookie), excluding
`expires` and `maxAge`.
</div>

```js
res.cookie('name', 'tobi', { path: '/admin' })
res.clearCookie('name', { path: '/admin' })
```
