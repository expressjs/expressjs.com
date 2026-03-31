---
title: req.protocol
description: Contains the request protocol string either http or (for TLS requests) https.
---

# req.protocol

Contains the request protocol string: either `http` or (for TLS requests) `https`.

When the [`trust proxy` setting](#trust.proxy.options.table) does not evaluate to `false`,
this property will use the value of the `X-Forwarded-Proto` header field if present.
This header can be set by the client or by the proxy.

```js
console.dir(req.protocol);
// => 'http'
```
