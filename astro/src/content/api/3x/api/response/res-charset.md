---
title: res.charset
description: Assign the charset. Defaults to "utf-8".
---

# res.charset

Assign the charset. Defaults to "utf-8".

```js
res.charset = 'value';
res.send('<p>some html</p>');
// => Content-Type: text/html; charset=value
```
