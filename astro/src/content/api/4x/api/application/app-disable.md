---
title: app.disable
description: Sets the Boolean setting name to false, where name is one of the properties from the app settings table.
---

<h3 id='app.disable'>app.disable(name)</h3>

Sets the Boolean setting `name` to `false`, where `name` is one of the properties from the [app settings table](/en/api/application/app-settings/).
Calling `app.set('foo', false)` for a Boolean property is the same as calling `app.disable('foo')`.

For example:

```js
app.disable('trust proxy');
app.get('trust proxy');
// => false
```
