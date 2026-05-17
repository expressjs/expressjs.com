<h3 id='app.render'>app.render(view, [options], callback)</h3>

Render a `view` with a callback responding with
the rendered string. This is the app-level variant of `res.render()`,
and otherwise behaves the same way.

The `view` argument can be an absolute path or a path relative to the `views` setting.
If the path does not contain a file extension, then the `view engine` setting determines
the file extension. For example, with `app.set('views', './views')` and
`app.set('view engine', 'pug')`, `app.render('email', ...)` renders `./views/email.pug`.

```js
app.render('email', function (err, html) {
  // ...
})

app.render('email', { name: 'Tobi' }, function (err, html) {
  // ...
})
```
