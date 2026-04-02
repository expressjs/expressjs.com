---
title: req.ip
description: Return the remote address, or when "trust proxy"
---

# req.ip

Return the remote address, or when "trust proxy"
is enabled - the upstream address.

```js
console.dir(req.ip);
// => '127.0.0.1'
```
