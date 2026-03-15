---
title: app.get
description: Returns the value of name app setting, where name is one of the strings in the
---

<h3 id='app.get'>app.get(name)</h3>

Returns the value of `name` app setting, where `name` is one of the strings in the
[app settings table](/en/api/application/app-settings/). For example:

```js
app.get('title');
// => undefined

app.set('title', 'My Site');
app.get('title');
// => "My Site"
```
