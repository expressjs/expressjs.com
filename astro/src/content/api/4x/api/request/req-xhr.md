---
title: req.xhr
description: A Boolean property that is true if the request X-Requested-With header field is "XMLHttpRequest"
---

# req.xhr

A Boolean property that is `true` if the request's `X-Requested-With` header field is
"XMLHttpRequest", indicating that the request was issued by a client library such as jQuery.

```js
console.dir(req.xhr);
// => true
```
