---
title: req.host
description: Returns the hostname from the "Host" header field (void of portno).
---

# req.host

Returns the hostname from the "Host" header field (void of portno).

```js
// Host: "example.com:3000"
console.dir(req.host);
// => 'example.com'
```
