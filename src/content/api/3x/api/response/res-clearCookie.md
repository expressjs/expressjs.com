---
title: res.clearCookie
description: Clear cookie name. The path option defaults to slash.
---

# res.clearCookie(name, [options])

Clear cookie `name`. The `path` option defaults to "/".

```js
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```
