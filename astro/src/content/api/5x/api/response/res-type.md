---
title: res.type
description: Sets the Content-Type HTTP header to the MIME type as determined by the specified type. If type contains the slash character, then it sets the Content-Type to the exact value.
---

# res.type(type)

Sets the `Content-Type` HTTP header to the MIME type as determined by the specified `type`. If `type` contains the "/" character, then it sets the `Content-Type` to the exact value of `type`, otherwise it is assumed to be a file extension and the MIME type is looked up using the `contentType()` method of the `mime-types` package.

```js
res.type('.html'); // => 'text/html'
res.type('html'); // => 'text/html'
res.type('json'); // => 'application/json'
res.type('application/json'); // => 'application/json'
res.type('png'); // => image/png:
```

Aliased as `res.contentType(type)`.
