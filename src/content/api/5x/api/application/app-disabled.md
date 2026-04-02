---
title: app.disabled
description: Returns true if the Boolean setting name is disabled (false), where name is one of the properties from
---

# app.disabled(name)

Returns `true` if the Boolean setting `name` is disabled (`false`), where `name` is one of the properties from
the [app settings table](/en/api/application/app-set#app.settings.table).

```js
app.disabled('trust proxy');
// => true

app.enable('trust proxy');
app.disabled('trust proxy');
// => false
```
