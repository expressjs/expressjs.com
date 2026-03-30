---
title: req.path
description: Contains the path part of the request URL.
---

# req.path

Contains the path part of the request URL.

```js
// example.com/users?sort=desc
console.dir(req.path);
// => "/users"
```

<div class="doc-box doc-info" markdown="1">
When called from a middleware, the mount point is not included in `req.path`. See [app.use()](/en/5x/api#app.use) for more details.
</div>
