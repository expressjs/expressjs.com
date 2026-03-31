---
title: res.set
description: Sets the response HTTP header field to value.
---

# res.set(field [, value])

Sets the response's HTTP header `field` to `value`.
To set multiple fields at once, pass an object as the parameter.

```js
res.set('Content-Type', 'text/plain');

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  ETag: '12345',
});
```

Aliased as `res.header(field [, value])`.
