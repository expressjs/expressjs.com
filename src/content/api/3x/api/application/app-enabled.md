---
title: app.enabled
description: Check if setting name is enabled.
---

# app.enabled(name)

Check if setting `name` is enabled.

```js
app.enabled('trust proxy');
// => false

app.enable('trust proxy');
app.enabled('trust proxy');
// => true
```
