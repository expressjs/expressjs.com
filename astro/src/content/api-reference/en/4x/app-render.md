<h3 id='app.render'>app.render(view, [locals], callback)</h3>

Returns the rendered HTML of a view via the `callback` function. It accepts an optional parameter
that is an object containing local variables for the view. It is like [res.render()](#res.render),
except it cannot send the rendered view to the client on its own.

<div class="doc-box doc-info" markdown="1">
Think of `app.render()` as a utility function for generating rendered view strings.
Internally `res.render()` uses `app.render()` to render views.
</div>

<div class="doc-box doc-warn" markdown="1">
The `view` argument performs file system operations like reading a file from
disk and evaluating Node.js modules, and as so for security reasons should not
contain input from the end-user.
</div>

<div class="doc-box doc-warn" markdown="1">
The `locals` object is used by view engines to render a response. The object
keys may be particularly sensitive and should not contain user-controlled
input, as it may affect the operation of the view engine or provide a path to
cross-site scripting. Consult the documentation for the used view engine for
additional considerations.
</div>

<div class="doc-box doc-notice" markdown="1">
The local variable `cache` is reserved for enabling view cache. Set it to `true`, if you want to
cache view during development; view caching is enabled in production by default.
</div>

```js
app.render('email', function (err, html) {
  // ...
})

app.render('email', { name: 'Tobi' }, function (err, html) {
  // ...
})
```
