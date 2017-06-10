<h3 id='directory'>directory()</h3>

Directory serving middleware, serves the given `path`.
This middleware may be paired with `static()` to serve
files, providing a full-featured file browser.

```js
app.use(express.directory('public'))
app.use(express.static('public'))
```

This middleware accepts the following options:

* `hidden` display hidden (dot) files. Defaults to false.
* `icons`  display icons. Defaults to false.
* `filter` Apply this filter function to files. Defaults to false.
