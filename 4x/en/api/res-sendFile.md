<div class="doc-box doc-info">`res.sendFile` is supported from Express v4.8.0 onwards</div>

Transfer the file at the given `path`. The Content-Type response header field is automatically set based on the filename's extension. Unless the `root` option is set in the options object, `path` must be an absolute path of the file.

The details of the `options` object is listed in the following table.

| Property        | Description                                     | Default     |
|-----------------|-------------------------------------------------|-------------|
|`maxAge`         | Sets the max-age property of the Cache-Control header in milliseconds or a string in [ms format](https://www.npmjs.org/package/ms)| 0 |
| `root`          | Root directory for relative filenames.|  |
| `lastModified`  | Sets the `Last-Modified` header to the last modified date of the file on the OS. Set `false` to disable it.| Enabled |
| `headers`       | Object of HTTP headers to serve with the file.|  |
| `dotfiles`      | Option for serving dotfiles. Possible values are "allow", "deny", "ignore".| "ignore" |

The callback `fn(err)` is invoked when the transfer is complete or when an error occurs. If the callback function is specified and an error occurs, the response process must be handled explicitly within the callback function by either ending the request response cycle, or passing the control to the next route.

Here is an example of using `res.sendFile` with all its arguments.

```js
app.get('/file/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

})
```

`res.sendFile` provides fine-grained support for file serving as illustrated in the following example:

```js
app.get('/user/:uid/photos/:file', function(req, res){
  var uid = req.params.uid
    , file = req.params.file;

  req.user.mayViewFilesFrom(uid, function(yes){
    if (yes) {
      res.sendFile('/uploads/' + uid + '/' + file);
    } else {
      res.status(403).send('Sorry! you cant see that.');
    }
  });
});
```
Please refer to [send](https://github.com/visionmedia/send) for additional documentation or any issues and concerns.
