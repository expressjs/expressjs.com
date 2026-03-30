---
title: res.get
description: Returns the HTTP response header specified by field.
---

# res.get(field)

Returns the HTTP response header specified by `field`.
The match is case-insensitive.

```js
res.get('Content-Type');
// => "text/plain"
```
