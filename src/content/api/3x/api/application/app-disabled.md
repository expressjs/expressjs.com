---
title: app.disabled
description: Check if setting name is disabled.
---

# app.disabled(name)

Check if setting `name` is disabled.

```js
app.disabled('trust proxy');
// => true

app.enable('trust proxy');
app.disabled('trust proxy');
// => false
```
