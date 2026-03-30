---
title: req.subdomains
description: An array of subdomains in the domain name of the request.
---

# req.subdomains

An array of subdomains in the domain name of the request.

```js
// Host: "tobi.ferrets.example.com"
console.dir(req.subdomains);
// => ['ferrets', 'tobi']
```

The application property `subdomain offset`, which defaults to 2, is used for determining the
beginning of the subdomain segments. To change this behavior, change its value
using [app.set](/api/application/app-set).
