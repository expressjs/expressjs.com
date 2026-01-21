<h3 id='req.files'>req.files</h3>

This property is an object of the files uploaded. This feature
is provided by the `bodyParser()` middleware, though other body
parsing middleware may follow this convention as well. This property
defaults to `{}` when `bodyParser()` is used.

For example if a <strong>file</strong> field was named "image",
and a file was uploaded, `req.files.image` would contain
the following `File` object:

```
{ size: 74643,
  path: '/tmp/8ef9c52abe857867fd0a4e9a819d1876',
  name: 'edge.png',
  type: 'image/png',
  hash: false,
  lastModifiedDate: Thu Aug 09 2012 20:07:51 GMT-0700 (PDT),
  _writeStream:
   { path: '/tmp/8ef9c52abe857867fd0a4e9a819d1876',
     fd: 13,
     writable: false,
     flags: 'w',
     encoding: 'binary',
     mode: 438,
     bytesWritten: 74643,
     busy: false,
     _queue: [],
     _open: [Function],
     drainable: true },
  length: [Getter],
  filename: [Getter],
  mime: [Getter] }
```

The `bodyParser()` middleware utilizes the
<a href="https://github.com/felixge/node-formidable">node-formidable</a>
module internally, and accepts the same options. An example of this
is the `keepExtensions` formidable option, defaulting to <strong>false</strong>
which in this case gives you the filename "/tmp/8ef9c52abe857867fd0a4e9a819d1876" void of
the ".png" extension. To enable this, and others you may pass them to `bodyParser()`:

```js
app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/my/files' }))
```
