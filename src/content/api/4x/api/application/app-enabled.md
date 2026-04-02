---
title: app.enabled
description: Returns true if the setting name is enabled (true), where name is one of the
---

# app.enabled(name)

Returns `true` if the setting `name` is enabled (`true`), where `name` is one of the
properties from the [app settings table](/en/api/application/app-set#app.settings.table).

```js
app.enabled('trust proxy');
// => false

app.enable('trust proxy');
app.enabled('trust proxy');
// => true
```
