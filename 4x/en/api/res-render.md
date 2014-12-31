Render a `view` and send the rendered HTML string to the client. It accepts an optional object of local variables for the view. When a `callback` is provided both the possible error and rendered string are returned, and no automated response is performed. When an error occurs `next(err)` is invoked internally.

```js
// send the rendered view to the client
res.render('index');

// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', function(err, html) {
  res.send(html);
});

// pass a local variable to the view
res.render('user', { name: 'Tobi' }, function(err, html) {
  // ...
});
```
