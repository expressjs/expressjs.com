<h3 id='res.sendfile'>res.sendfile(path, [options], [fn]])</h3>

Transfer the file at the given `path`.

Automatically defaults the Content-Type response header field based
on the filename's extension. The callback `fn(err)` is
invoked when the transfer is complete or when an error occurs.

Options:

* `maxAge` in milliseconds defaulting to 0
* `root` root directory for relative filenames

This method provides fine-grained support for file serving
as illustrated in the following example:

```js
app.get('/user/:uid/photos/:file', function (req, res) {
  var uid = req.params.uid
  var file = req.params.file

  req.user.mayViewFilesFrom(uid, function (yes) {
    if (yes) {
      res.sendfile('/uploads/' + uid + '/' + file)
    } else {
      res.send(403, 'Sorry! you cant see that.')
    }
  })
})
```
