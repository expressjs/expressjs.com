---
title: app.render
description: Render a view with a callback responding with
---

# app.render(view, [options], callback)

Render a `view` with a callback responding with
the rendered string. This is the app-level variant of `res.render()`,
and otherwise behaves the same way.

```js
app.render('email', function (err, html) {
  // ...
});

app.render('email', { name: 'Tobi' }, function (err, html) {
  // ...
});
```
