<h3 id='res.render'>res.render(view [, locals] [, callback])</h3>

Renders a `view` and sends the rendered HTML string to the client.
Optional parameters:

- `locals`, an object whose properties define local variables for the view.
- `callback`, a callback function. If provided, the method returns both the possible error and rendered string, but does not perform an automated response. When an error occurs, the method invokes `next(err)` internally.

The `view` argument is a string that is the file path of the view file to render. This can be an absolute path, or a path relative to the `views` setting. If the path does not contain a file extension, then the `view engine` setting determines the file extension. If the path does contain a file extension, then Express will load the module for the specified template engine (via `require()`) and render it using the loaded module's `__express` function.

For more information, see [Using template engines with Express](/guide/using-template-engines.html).

**NOTE:** The `view` argument performs file system operations like reading a file from disk and evaluating Node.js modules, and as so for security reasons should not contain input from the end-user.

<div class="doc-box doc-notice" markdown="1">
The local variable `cache` enables view caching. Set it to `true`,
to cache the view during development; view caching is enabled in production by default.
</div>

```js
// send the rendered view to the client
res.render('index')

// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', (err, html) => {
  res.send(html)
})

// pass a local variable to the view
res.render('user', { name: 'Tobi' }, (err, html) => {
  // ...
})
```
