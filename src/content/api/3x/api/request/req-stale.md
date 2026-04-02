---
title: req.stale
description: Check if the request is stale - aka Last-Modified and/or the ETag do not match,
---

# req.stale

Check if the request is stale - aka Last-Modified and/or the ETag do not match,
indicating that the resource is "stale".

```js
console.dir(req.stale);
// => true
```
