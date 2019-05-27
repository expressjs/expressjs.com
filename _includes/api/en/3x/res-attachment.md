<h3 id='res.attachment'>res.attachment([filename])</h3>

Sets the Content-Disposition header field to "attachment". If
a `filename` is given then the Content-Type will be
automatically set based on the extname via `res.type()`,
and the Content-Disposition's "filename=" parameter will be set.

```js
res.attachment()
// Content-Disposition: attachment

res.attachment('path/to/logo.png')
// Content-Disposition: attachment; filename="logo.png"
// Content-Type: image/png
```
