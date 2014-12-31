Return the rendered HTML of a view via the `callback` function. It accepts an optional object of local variables for the view. It is like [res.render()](#res.render), except it cannot send the rendered view to the client on its own.

<div class="doc-box doc-info">
Think of `app.render()` as a utility function for generating rendered view strings. Internally `res.render()` uses `app.render()` to render views.
</div>

```js
app.render('email', function(err, html){
  // ...
});

app.render('email', { name: 'Tobi' }, function(err, html){
  // ...
});
```
