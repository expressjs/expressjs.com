---
title: req.cookies
description: This object requires the cookieParser middleware for use.
---

# req.cookies

This object requires the `cookieParser()` middleware for use.
It contains cookies sent by the user-agent. If no cookies are sent, it
defaults to `{}`.

```js title="index.js"
// Cookie: name=tj
console.log(req.cookies.name);
// => "tj"
```
