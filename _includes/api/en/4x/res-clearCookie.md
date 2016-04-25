<h3 id='res.clearCookie'>res.clearCookie(name [, options])</h3>

Clears the cookie specified by `name`. For details about the `options` object, see [res.cookie()](#res.cookie).

```js
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```
