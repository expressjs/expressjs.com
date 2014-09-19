Sets the Content-Disposition header field to "attachment". If a <code>filename</code> is given, then the Content-Type will be automatically set based on the extname via <code>res.type()</code>, and the Content-Disposition's "filename=" parameter will be set.

```
res.attachment();
// Content-Disposition: attachment

res.attachment('path/to/logo.png');
// Content-Disposition: attachment; filename="logo.png"
// Content-Type: image/png
```
