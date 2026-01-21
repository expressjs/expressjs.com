<h3 id='res.sendFile'>res.sendFile(path [, options] [, fn])</h3>

<div class="doc-box doc-info" markdown="1">
`res.sendFile()` is supported by Express v4.8.0 onwards.
</div>

Transfers the file at the given `path`. Sets the `Content-Type` response HTTP header field
based on the filename's extension. Unless the `root` option is set in
the options object, `path` must be an absolute path to the file.

<div class="doc-box doc-warn" markdown="1">
This API provides access to data on the running file system. Ensure that either (a) the way in
which the `path` argument was constructed into an absolute path is secure if it contains user
input or (b) set the `root` option to the absolute path of a directory to contain access within.

When the `root` option is provided, the `path` argument is allowed to be a relative path,
including containing `..`. Express will validate that the relative path provided as `path` will
resolve within the given `root` option.
</div>

The following table provides details on the `options` parameter.

<div class="table-scroller" markdown="1">

| Property        | Description                                     | Default     | Availability |
|-----------------|-------------------------------------------------|-------------|--------------|
|`maxAge`         | Sets the max-age property of the `Cache-Control` header in milliseconds or a string in [ms format](https://www.npmjs.org/package/ms)| 0 |  |
| `root`          | Root directory for relative filenames.|  |  |
| `lastModified`  | Sets the `Last-Modified` header to the last modified date of the file on the OS. Set `false` to disable it.| Enabled | 4.9.0+ |
| `headers`       | Object containing HTTP headers to serve with the file.|  |  |
| `dotfiles`      | Option for serving dotfiles. Possible values are "allow", "deny", "ignore".| "ignore" | &nbsp; |
| `acceptRanges`  | Enable or disable accepting ranged requests. | `true` | 4.14+ |
| `cacheControl`  | Enable or disable setting `Cache-Control` response header.| `true` | 4.14+ |
| `immutable`   | Enable or disable the `immutable` directive in the `Cache-Control` response header. If enabled, the `maxAge` option should also be specified to enable caching. The `immutable` directive will prevent supported clients from making conditional requests during the life of the `maxAge` option to check if the file has changed. | `false` | 4.16+ |

</div>

The method invokes the callback function `fn(err)` when the transfer is complete
or when an error occurs. If the callback function is specified and an error occurs,
the callback function must explicitly handle the response process either by
ending the request-response cycle, or by passing control to the next route.

Here is an example of using `res.sendFile` with all its arguments.

```js
app.get('/file/:name', (req, res, next) => {
  const options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  const fileName = req.params.name
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})
```

The following example illustrates using
`res.sendFile` to provide fine-grained support for serving files:

```js
app.get('/user/:uid/photos/:file', (req, res) => {
  const uid = req.params.uid
  const file = req.params.file

  req.user.mayViewFilesFrom(uid, (yes) => {
    if (yes) {
      res.sendFile(`/uploads/${uid}/${file}`)
    } else {
      res.status(403).send("Sorry! You can't see that.")
    }
  })
})
```
For more information, or if you have issues or concerns, see [send](https://github.com/pillarjs/send).
