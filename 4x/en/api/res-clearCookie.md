Clear cookie `name`. The `path` option defaults to "/".

```js
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```
