As of 4.x, Express no longer depends on Connect. Except for `express.static`, all of Express' previously included middleware are now in separate repos. Please view [the list of middleware](https://github.com/senchalabs/connect#middleware).

<h4 id='express.static'>express.static(root, [options])</h4>

`express.static` is based on [serve-static](https://github.com/expressjs/serve-static), and is responsible for serving the static assets of an Express application.

The `root` argument refers to the root directory from which the static assets are to be served.

The optional `options` object can have the following properties.

* `dotfiles` option for serving dotfiles. Possible values are "allow", "deny", "ignore"; defaults to "ignore".
* `etag` enable or disable etag generation, defaults to `true`.
* `extensions` sets file extension fallbacks, defaults to `false`.
* `index` sends directory index file, defaults to "index.html". Set `false` to disable directory indexing.
* `lastModified` enabled by default, sets the `Last-Modified` header to the last modified date of the file on the OS. Set `false` to disable it.
* `maxAge` sets the max-age property of the Cache-Control header in milliseconds or a string in [ms format](https://www.npmjs.org/package/ms), defaults to 0.
* `redirect` redirects to trailing "/" when the pathname is a dir, defaults to `true`.
* `setHeaders` function for setting HTTP headers to serve with the file.

Here is an example of using the `express.static` middleware with an elaborate options object.

```js
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
};

app.use(express.static('public', options));
```

You can have more than one static directory per app.

```js
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
```

For more details about `serve-static` and its options, visit the [serve-static](https://github.com/expressjs/serve-static) documentation.
