---
title: app.enable
description: Sets the Boolean setting name to true, where name is one of the properties from the app settings table.
---

# app.enable(name)

Sets the Boolean setting `name` to `true`, where `name` is one of the properties from the [app settings table](/en/api/application/app-set#app.settings.table).
Calling `app.set('foo', true)` for a Boolean property is the same as calling `app.enable('foo')`.

```js
app.enable('trust proxy');
app.get('trust proxy');
// => true
```
